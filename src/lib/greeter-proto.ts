import { resolve } from 'path/posix'

import type { ProtoGrpcType } from '../proto/greeter_api'
import { loadProto } from './load-proto'

const protoFilePath = resolve(__dirname, '..', 'proto', 'greeter_api.proto')
const protoIncludePath = resolve(protoFilePath, '..')

export const proto = loadProto<ProtoGrpcType>(protoFilePath, [protoIncludePath])
