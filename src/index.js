export function getEnvVar(key, opts={}) {
  const fallback = process.env['NODE_ENV'] === 'development' ? opts.devDefault : undefined
  let value = process.env[key] || fallback

  if(typeof value === 'undefined')
    throw new Error(`${key} is undefined`)

  if (opts.boolean && typeof value !== 'boolean')
    value = (value === 'true')

  if (opts.commaSeparated && typeof value === 'string')
    value = value.split(',')

  return value
}
