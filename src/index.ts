import './lib/process'

import { greeterHandlers } from './api'
import { config } from './lib/config'
import { createServer } from './lib/create-server'
import { createClient } from './lib/greeter-client'
import { proto } from './lib/greeter-proto'
import { logger } from './lib/logger'

logger.setIndent(config.LOG_INDENT)
logger.info({ message: 'Hello World', config })

const main = async () => {
  const address = '0.0.0.0:9090'

  const { server, listen } = createServer()
  server.addService(proto.Greeter.service, greeterHandlers)
  await listen(address)

  const greeter = createClient(address)
  const { message } = await greeter.sayHello('kilian')
  logger.info(message)
}

main()
  .then(() => {
    if (process.env.CI == null) return
    process.emit('SIGINT', 'SIGINT')
  })
  .catch((err: Error) => {
    console.error(err)
    process.exit(1)
  })
