'use server'

import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import { ServerResponse } from '../utils'

export default async function regenerateMediaImages() {
  const payload = await getPayload({ config })
  let res = ServerResponse('Error: Unable to generate Images', 'error')
  try {
    const media = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 300,
    })
    await Promise.all(
      media.docs.map(async (mediaDoc) => {
        try {
          const staticDir = path.resolve(process.cwd(), './media')

          await payload.update({
            collection: 'media',
            id: mediaDoc.id,
            data: mediaDoc,
            filePath: `${staticDir}/${mediaDoc.filename}`,
            overwriteExistingFiles: true,
          })

          console.log(`Media ${mediaDoc.alt || mediaDoc.id} regenerated successfully`)

          res = ServerResponse('Success: Images generated successfully', 'success')
        } catch (err) {
          console.error(`Media ${mediaDoc.alt || mediaDoc.id} failed to regenerate`)
          console.error(err)
        }
      }),
    )
  } catch (err) {
    console.log('Unable to find documents with payload')
    console.error(err)
  }

  console.log('Media size regeneration completed!')
  return res
}
