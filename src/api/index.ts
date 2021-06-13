import type { GreeterHandlers } from '../proto/Greeter'

export const greeterHandlers: GreeterHandlers = {
  SayHello: (call, reply) => {
    reply(null, { message: `Hello ${call.request.name}!` })
  }
}
