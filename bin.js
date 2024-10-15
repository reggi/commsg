#!/usr/bin/env node
const {command} = require('./index.js')
const minimist = require('minimist')
const packageJson = require('./package.json')

try {
  const flags = minimist(process.argv.slice(2), {'--': true})
  if (flags.help) {
    console.log(
      `
 Usage: conventional-commit [options]
 Description: ${packageJson.description}
 Options:
   --*                        Any flag acts as a prefix for the commit message
   --breaking-change, -bc, -b Indicate a breaking change
   --preserve-quotes, -pq, -q Preserve quotes in the commit message
   --                         Pass flags through to git before the subcommand

`.trim(),
    )
    process.exit(0)
  }
  const breakingChange = flags['breaking-change'] || flags['bc'] || flags['b']
  const preserveQuotes = flags['preseve-quotes'] || flags['pq'] || flags['q']
  const doubleDash = flags['--']
  delete flags['breaking-change']
  delete flags['bc']
  delete flags['b']
  delete flags['preseve-quotes']
  delete flags['pq']
  delete flags['q']
  delete flags['_']
  delete flags['--']
  delete flags['print']
  console.log(command(flags, {breakingChange, preserveQuotes, doubleDash}))
} catch (e) {
  console.error(e.message)
  process.exit(1)
}
