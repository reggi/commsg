const message = (rest, {breakingChange} = {}) => {
  const options = Object.entries(rest)
  if (options.length !== 1) {
    throw new Error('One prefix is allowed')
  }
  const [prefix, message] = options[0]
  let result = prefix
  if (breakingChange) result += '!'
  result += `: ${message}`
  const r = [result]
  if (typeof breakingChange === 'string') {
    r.push(`BREAKING CHANGE: ${breakingChange}`)
  }
  return r
}

const command = (rest, opts = {}) => {
  const messages = message(rest, opts)
  let value = [`git`, ...opts.doubleDash, `commit`, ...messages.map(v => `-m "${v}"`)].join(' ').replace('!', '\\!')
  if (!opts.preserveQuotes) {
    value = value.replace(/'/g, '\\`')
  }
  return value
}

module.exports = {
  message,
  command,
}
