import { loadPackageDefinition } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'

export const loadProto = <T>(path: string, includePaths: string[]) => {
  const packageDefinition = loadSync(path, {
    includeDirs: includePaths,
    enums: String
  })

  return loadPackageDefinition(packageDefinition) as unknown as T
}
