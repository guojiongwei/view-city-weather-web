/** 精确判断数据类型 */
export function getType<T>(val: T) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

/** 删除对象value两边空格和换行符 */
export function formatParams<T extends Object>(obj: T) {
  const type = getType(obj)
  if (type !== 'Object' && type !== 'Array') return obj
  const newParams = Array.isArray(obj) ? [...obj] : { ...obj }
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string') {
      // @ts-ignore
      newParams[key] = value.trim().replace(/\n\r/g, '')
    } else {
      // @ts-ignore
      newParams[key] = formatParams(value)
    }
    // @ts-ignore
    if (newParams[key] === null) delete newParams[key]
  }
  return newParams
}

/** 对象转为query参数字符串 */
export function serializeObject(query: any): string {
  if (!query) {
    return ''
  }
  const newObj: Record<string, unknown> = (Object.keys(query) || [])
    .filter(key => query[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {})
  let str = ''
  for (const key in newObj) {
    str = `${str}${key}=${newObj[key]}&`
  }
  str = str.substring(0, str.length - 1)
  return str ? `?${str}` : ''
}
