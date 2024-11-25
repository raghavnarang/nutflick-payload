import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getHomePageOptions() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'home-page-options' })
}
