import { readdir, readFile, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import { parse } from 'yaml'
import * as flat from 'flat'

interface TreeNode {
  title: string
  _path?: string
  data?: Record<string, unknown>
  content?: string
  children?: TreeNode[]
}

export async function buildComponentTree(dirPath: string): Promise<TreeNode[]> {
  const tree: TreeNode[] = []

  try {
    const files = await readdir(dirPath)

    for (const file of files) {
      const fullPath = join(dirPath, file)
      const stats = await stat(fullPath)

      // Skip hidden files and _dir.yml
      if (file.startsWith('.') || file === '_dir.yml') {
        continue
      }

      if (stats.isDirectory()) {
        // Handle directory
        const children = await buildComponentTree(fullPath)
        if (children.length > 0) {
          tree.push({
            title: file,
            children,
          })
        }
      }
      else {
        const _content = await readFile(fullPath, 'utf-8')
        const { content, data } = parseFrontMatter(_content)
        console.log(content, data)
        // Handle file
        // Remove extension and convert to title
        const title = file.replace(/\.[^/.]+$/, '')

        // Get relative path from components dir
        const relativePath = fullPath.split('2.components/')[1]

        tree.push({
          title,
          _path: relativePath,
          content,
          ...data,
        })
      }
    }

    // Sort alphabetically
    return tree.sort((a, b) => a.title.localeCompare(b.title))
  }
  catch (err) {
    console.error('Error reading directory:', err)
    return []
  }
}

export async function generateAndSaveComponentTree(): Promise<void> {
  try {
    // Get the root directory of the project
    const rootDir = process.cwd()
    const componentsPath = join(rootDir, '.playground/content/2.components')

    // Generate the tree
    const tree = await buildComponentTree(componentsPath)

    // Write to components-tree.json in the root directory
    const outputPath = join(rootDir, 'components-tree.json')
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
