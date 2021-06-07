import { Server, ServerCredentials } from '@grpc/grpc-js'
import { promisify } from 'util'

import { config } from './config'
import { logger } from './logger'

export const createServer = () => {
  const server: Server = new Server()
  const listen = createListen(server)
  const close = createClose(server)

  config.EXIT_SIGNALS.forEach((exitSignal) => {
    process.on(exitSignal, close)
  })

  return { server, close, listen }
}

export const createListen = (server: Server) => async (address: string) => {
  const bind = promisify(server.bindAsync).bind(server)
  const port: number = await bind(address, ServerCredentials.createInsecure())
  server.start()
  logger.info(`gRPC server listening on port ${port}`)
}

export const createClose = (server: Server) => () => {
  logger.info(`shutting down gRPC server`)
  const tryShutdown = promisify(server.tryShutdown).bind(server)
  tryShutdown().catch((err) => {
    logger.error({ err })
    server.forceShutdown()
  })
}
