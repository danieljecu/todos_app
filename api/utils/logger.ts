import winston from 'winston'
import { Console } from 'winston/lib/winston/transports'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV ?? 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)


const errorStackFormat = winston.format((info) => {
  if (info.stack) {
    console.log(info.stack);
    return false;
  }
  return info;
});
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
  errorStackFormat()
)

const transports = [
  new winston.transports.Console({
    format
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})


//
// Any logger instance
//
Logger.log('silly', "127.0.0.1 - there's no place like home");
Logger.log('debug', "127.0.0.1 - there's no place like home");
Logger.log('verbose', "127.0.0.1 - there's no place like home");
Logger.log('info', "127.0.0.1 - there's no place like home");
Logger.log('warn', "127.0.0.1 - there's no place like home");
Logger.log('error', "127.0.0.1 - there's no place like home");
Logger.info("127.0.0.1 - there's no place like home");
Logger.warn("127.0.0.1 - there's no place like home");
Logger.error("127.0.0.1 - there's no place like home");

//
// Default logger
//
winston.log('info', "127.0.0.1 - there's no place like home");
winston.info("127.0.0.1 - there's no place like home");


Logger.debug('Debugging info');
Logger.debug('Debugging info');
Logger.debug('Debugging info');
// Logger.verbose('Verbose info');
Logger.info('Hello world');
Logger.warn('Warning message');
Logger.error('Error info');

export default Logger