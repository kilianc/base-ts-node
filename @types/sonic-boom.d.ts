declare module 'sonic-boom' {
  import { EventEmitter } from 'events'

  declare class SonicBoom extends EventEmitter {
    public constructor({ fd }: { fd: number | string | symbol })
    public write(string: string): void
    public flush(): void
    public reopen(fileDescriptor?: number | string): void
    public flushSync(): void
    public end(): void
    public destroy(): void
  }

  export = SonicBoom
}
