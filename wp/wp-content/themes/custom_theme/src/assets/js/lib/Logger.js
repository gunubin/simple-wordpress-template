export default class Logger {

  static debug() {
    return process.env.NODE_ENV === 'development'
  }

  static log() {
    if (Logger.debug()) {
      let args = [...arguments]
      args.unshift('%c[DEBUG]', 'font-weight: bold; color:#999;')
      console.log.apply(console, args)
    }
  };

  static info() {
    if (Logger.debug()) {
      let args = [...arguments]
      args.unshift('%c[INFO]', 'font-weight: bold; color:#0D47A1;')
      console.log.apply(console, args)
    }
  };

  static trace() {
    if (Logger.debug()) {
      let args = [...arguments]
      console.trace.apply(console, args)
    }
  };

  static error() {
    if (Logger.debug()) {
      let args = [...arguments]
      args.unshift('%c[ERROR]', 'font-weight: bold; color:#ff1744;')
      console.log.apply(console, args)
    }
  };

  static assert() {
    if (Logger.debug()) {
      let args = [...arguments]
      args.unshift('%c[ASSERT]', 'font-weight: bold; color:#f44336;')
      console.log.apply(console, args)
    }
  };

}
