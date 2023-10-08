import stringify from 'fast-safe-stringify'
import SonicBoom from 'sonic-boom'

import { config } from './config'

export type Levels = (typeof logLevels)[number]
export const logLevels = ['debug', 'info', 'warn', 'error'] as const

const stdout = new SonicBoom({ fd: process.stdout.fd })

let indent = 0
let minLogLevelIndex = logLevels.indexOf('info')

const createLogFunction = (level: Levels) => {
  const logLevelIndex = logLevels.indexOf(level)

  return (data: Record<string, unknown> | string) => {
    if (logLevelIndex < minLogLevelIndex) return

    const normalizedData = typeof data === 'string' ? { message: data } : data

    stdout.write(
      `${stringify(
        {
          ...normalizedData,
          app: config.APP_NAME,
          revision: config.REVISION,
          severity: level
        },
        undefined,
        indent
      )}\n`
    )
  }
}

export const logger = {
  debug: createLogFunction('debug'),
  info: createLogFunction('info'),
  warn: createLogFunction('warn'),
  error: createLogFunction('error'),
  setLevel: (level: Levels) => (minLogLevelIndex = logLevels.indexOf(level)),
  getLevel: () => logLevels[minLogLevelIndex],
  setIndent: (_indent: number) => (indent = _indent)
}
