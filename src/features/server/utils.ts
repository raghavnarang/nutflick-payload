'use server'

import 'server-only'

export async function ServerResponse<T>(
  message: string,
  status: 'error' | 'success' | 'info',
  data?: T,
) {
  return {
    message,
    status,
    data,
  }
}
