import { config } from './config'
import { logger } from './logger'

const onUncaughtException = (err: Error) => {
  logger.error({
    error: err.message,
    stack: err.stack?.split('\n')
  })

  // we give the process time to drain the stdout
  // stream otherwise we might miss log lines
  setTimeout(() => process.exit(1), 5000)
}

process
  .on('unhandledRejection', onUncaughtException)
  .on('uncaughtException', onUncaughtException)

process.on('warning', (warning: Error) => {
  logger.warn({ warning })
})

for (const exitSignal of config.EXIT_SIGNALS) {
  process.on(exitSignal, () => {
    logger.info(`${exitSignal} received, shutting down...`)
    // cleanup code goes here
    // ...
  })
}
