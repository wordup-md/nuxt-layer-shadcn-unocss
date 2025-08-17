import { readdir, readFile, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import { parse } from 'yaml'
import * as flat from 'flat'

interface TreeNode {
  title: string
  _id?: string
  _path?: string
  data?: Record<string, unknown>
  content?: string
  children?: TreeNode[]
  description?: string
  icon?: string
}

const dirFile = '_dir.yml'

export async function buildContentTree(dirPath: string): Promise<TreeNode[]> {
  const tree: TreeNode[] = []

  try {
    const files = await readdir(dirPath)

    for (const file of files) {
      const fullPath = join(dirPath, file)
      const stats = await stat(fullPath)

      // Skip hidden files and _dir.yml
      if (file.startsWith('.') || file === dirFile) {
        continue
      }

      if (stats.isDirectory()) {
        // Handle directory
        const children = await buildContentTree(fullPath)
        if (children.length > 0) {
          let dir: TreeNode = {
            title: file,
            children,
          }

          const dirConfigPath = join(fullPath, dirFile)
          if (await stat(dirConfigPath).catch(() => false)) {
            const _dir = await readFile(fullPath + '/' + dirFile, 'utf-8')
            const yaml = parse(_dir)
            dir = {
              ...dir,
              ...yaml,
            }

            // Get relative path from content dir
            const relativePath = fullPath.split('content/')[1]
            dir._path = relativePath.replaceAll(/(^|\/)\d+\./g, '/').replace(/^\//, '')
          }

          tree.push(dir)
        }
      }
      else {
        const _content = await readFile(fullPath, 'utf-8')
        const { content, data } = parseFrontMatter(_content)
        // Get relative path from content dir
        const relativePath = fullPath.split('content/')[1]
        const pathWithoutExt = relativePath.replaceAll(/(^|\/)\d+\./g, '/').replace(/\.md$/, '').replace(/^\//, '')

        // Extract the numeric prefix if it exists
        // const numMatch = pathWithoutExt.match(/^(\d+)\./)
        const node: TreeNode = {
          title: pathWithoutExt, // Remove numeric prefix from title
          _id: 'content:' + relativePath.replace(/\//g, ':'),
          _path: pathWithoutExt,
          content,
          ...data,
        }

        if (node._path !== 'index' && !/^test.*/i.test(node._path || '') && !node._path?.startsWith('_'))
          tree.push(node)
        // if (numMatch) {
        //   // Use the number as index (subtract 1 since arrays are 0-based)
        //   const index = parseInt(numMatch[1]) - 1
        //   tree.splice(index, 0, node)
        // }
        // else {
        //   // If no number prefix, just push to the end

        // }
      }
    }

    // Sort items with numeric prefixes first, then alphabetically
    // return tree.sort((a, b) => {
    //   const aMatch = a._path.match(/^(\d+)\./)
    //   const bMatch = b._path.match(/^(\d+)\./)

    //   // If both have numeric prefixes, sort by number
    //   if (aMatch && bMatch) {
    //     const aNum = parseInt(aMatch[1])
    //     const bNum = parseInt(bMatch[1])
    //     if (aNum !== bNum) {
    //       return aNum - bNum
    //     }
    //   }

    //   // If only one has prefix, it goes first
    //   if (aMatch && !bMatch) return -1
    //   if (!aMatch && bMatch) return 1

    //   // Otherwise sort alphabetically
    //   return a.title.localeCompare(b.title)
    // })
    return tree
  }
  catch (err) {
    console.error('Error reading directory:', err)
    return []
  }
}

export async function generateAndSaveContentDoc(file: string = 'content-doc.json'): Promise<void> {
  try {
    // Get the root directory of the project
    const rootDir = process.cwd()
    const basePath = join(rootDir, '.playground/content')

    // Generate the tree
    const tree = await buildContentTree(basePath)

    // Write to components-tree.json in the root directory
    const outputPath = join(rootDir, 'public', file)
    await writeFile(
      outputPath,
      JSON.stringify(tree, null, 2),
      'utf-8',
    )

    console.log(`Components tree saved to ${outputPath}`)
  }
  catch (err) {
    console.error('Error generating or saving component tree:', err)
    throw err
  }
}

const FRONTMATTER_DELIMITER_DEFAULT = '---'
const LF = '\n'
const CR = '\r'
export function parseFrontMatter(content: string) {
  let data: Record<string, unknown> = {}
  if (content.startsWith(FRONTMATTER_DELIMITER_DEFAULT)) {
    const idx = content.indexOf(LF + FRONTMATTER_DELIMITER_DEFAULT)
    if (idx !== -1) {
      const hasCarriageReturn = content[idx - 1] === CR
      const frontmatter = content.slice(4, idx - (hasCarriageReturn ? 1 : 0))
      if (frontmatter) {
        data = parse(frontmatter)
        content = content.slice(idx + 4 + (hasCarriageReturn ? 1 : 0))
      }
    }
  }

  return {
    content,
    // unflatten frontmatter data. convert `parent.child` keys into `parent: { child: ... }`
    data: flat.unflatten(data || {}, {}) as Record<string, unknown>,
  }
}
