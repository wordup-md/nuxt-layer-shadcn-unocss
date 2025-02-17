import { generateAndSaveContentDoc } from './buildContentDoc'

generateAndSaveContentDoc()
  .then(() => process.exit(0))
  .catch((err: Error) => {
    console.error(err)
    process.exit(1)
  })
