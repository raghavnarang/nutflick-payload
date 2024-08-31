import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const getNestedValue = <T>(obj: T, path: (string | number)[]): any => {
  return path.reduce((acc: any, key) => {
    if (acc && typeof acc === 'object') {
      return acc[key]
    }
    return undefined
  }, obj)
}

const formatSlug =
  (titleField: string): FieldHook =>
  ({ operation, value, originalDoc, data, path }) => {
    if (operation === 'create' || operation === 'update') {
      const titleFieldPath = path.slice(0, path.length - 1)
      titleFieldPath.push(titleField)
      const title =
        getNestedValue(data, titleFieldPath) || getNestedValue(originalDoc, titleFieldPath)

      if (title && typeof title === 'string') {
        return format(title)
      }
    }

    return value
  }

export default formatSlug
