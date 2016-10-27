export function getEnvVar(key, opts={}) {
  const fallback = process.env['NODE_ENV'] === 'development' ? opts.devDefault : undefined
  let value = process.env[key] === undefined ? fallback : process.env[key]

  if(!opts.optional && typeof value === 'undefined')
    throw new Error(`${key} is undefined`)

  if (opts.boolean && typeof value !== 'boolean')
    value = (value === 'true')

  if (opts.commaSeparated && typeof value === 'string')
    value = value.split(',').map((element) => { return element.trim() })

  return value
}
