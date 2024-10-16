export function ServerResponse<T>(message: string, status: 'error' | 'success', data?: T) {
  return {
    message,
    status,
    data,
  }
}
