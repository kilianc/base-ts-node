declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string
      REVISION: string
      LOG_INDENT: ?string
      // add your known envs here
      FOO: ?string
    }
  }
}

export {}
