import { credentials } from '@grpc/grpc-js'

import type { GreeterClient } from '../proto/Greeter'
import type { HelloReply__Output } from '../proto/HelloReply'
import { proto } from './greeter-proto'

export const createClient = (address: string) => {
  const client = new proto.Greeter(address, credentials.createInsecure())
  return { sayHello: sayHello(client) }
}

const sayHello = (client: GreeterClient) => async (name: string) => {
  return await new Promise<HelloReply__Output>((resolve, reject) => {
    client.SayHello({ name }, (err, result) => {
      if (err != null) reject(err)
      else if (result != null) resolve(result)
    })
  })
}
