class Logger {
  public static instance: Logger | undefined;

  constructor() {
    return this.createSingleton();
  }

  createSingleton(): Logger {
    if (!Logger.instance) {
      Logger.instance = this;
    }
    return Logger.instance;
  }

  error(message: string) {
    console.error(message);
  }
  info(message: string) {
    console.log(message);
  }
}

const logger = new Logger();

// eslint-disable-next-line no-restricted-exports
export { logger as default };
