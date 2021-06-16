import { stripIndent as s } from 'common-tags'
import { config as loadDotEnvIfPresent } from 'dotenv'

loadDotEnvIfPresent()

const errors = []

if (process.env.FOO == null) {
  errors.push(s`
    error: missing required env "FOO=******"
           see "https://hot-to-get-foo-link"
  `)
}

if (process.env.BAR == null) {
  errors.push(s`
    error: missing required env "BAR=******"
           see "https://hot-to-get-bar-link"
  `)
}

if (errors.length > 0) {
  console.error(errors.join('\n\n'))
  process.exit(1)
}

const tryParseInt = (n: string | null | undefined, fallback: number) => {
  const parsed = Number.parseInt(n ?? '', 10)
  return Number.isNaN(parsed) ? fallback : parsed
}

export const config = {
  APP_NAME: process.env.APP_NAME,
  REVISION: process.env.REVISION,
  EXIT_SIGNALS: ['SIGINT', 'SIGTERM'],
  LOG_INDENT: tryParseInt(process.env.LOG_INDENT, 0),
  FOO: process.env.FOO,
  BAR: process.env.BAR
}
