import { Server, ServerCredentials } from '@grpc/grpc-js'
import { promisify } from 'util'

import { config } from './config'
import { logger } from './logger'

export const createServer = () => {
  const server: Server = new Server()
  const listen = createListen(server)
  const close = createClose(server)

  for (const exitSignal of config.EXIT_SIGNALS) {
    process.on(exitSignal, close)
  }

  return { server, close, listen }
}

export const createListen = (server: Server) => {
  const bind = promisify(server.bindAsync).bind(server)

  return async (address: string) => {
    const port: number = await bind(address, ServerCredentials.createInsecure())
    server.start()
    logger.info(`gRPC server listening on port ${port}`)
  }
}

export const createClose = (server: Server) => {
  const tryShutdown = promisify(server.tryShutdown).bind(server)

  return () => {
    logger.info(`shutting down gRPC server`)

    tryShutdown().catch((err: Error) => {
      logger.error({ err })
      server.forceShutdown()
    })
  }
}
