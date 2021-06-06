declare module 'sonic-boom' {
  import { EventEmitter } from 'events'

  declare class SonicBoom extends EventEmitter {
    constructor({ fd }: { fd: string | number | symbol })
    write(string: string): void
    flush(): void
    reopen(fileDescriptor?: string | number): void
    flushSync(): void
    end(): void
    destroy(): void
  }

  export = SonicBoom
}
