import { stripIndent as s } from 'common-tags'
import { config as loadDotEnvIfPresent } from 'dotenv'

loadDotEnvIfPresent()

if (process.env.FOO == null) {
  console.error(s`
    error: missing required env "FOO=******"
           see "https://hot-to-get-foo-link"
  `)
}

if (process.env.BAR == null) {
  console.error(s`
    error: missing required env "BAR=******"
           see "https://hot-to-get-bar-link"
  `)
}

if (process.env.FOO == null || process.env.BAR == null) {
  process.exit(1)
}

export const config = {
  APP_NAME: process.env.APP_NAME,
  REVISION: process.env.REVISION,
  LOG_INDENT: parseInt(process.env.LOG_INDENT ?? '', 10) ?? 0,
  FOO: process.env.FOO,
  BAR: process.env.BAR
}
