export function getEnvVar(key, fallback, opts={}) {
  let value = process.env[key] || fallback

  if (opts.boolean && typeof value !== 'boolean')
    value = (value === 'true')

  if (opts.commaSeperated && typeof value === 'string')
    value = value.split(',')

  return value
}
