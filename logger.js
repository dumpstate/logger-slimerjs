const fs = require('fs')


const levels = {
  'error': 0,
  'warn': 1,
  'info': 2,
  'verbose': 3,
  'debug': 4,
  'silly': 5
}

const timeStr = (date) =>
  date.toString() + ' [' + date.getTime() + ']'

const argsStr = (args) =>
  Array.prototype.slice.call(args).join(', ')

const logEntry = (level, args) =>
  timeStr(new Date()) + ' - [' + level + ']: ' + argsStr(args)

const write = (logLevel, logFilePath) => (level) => () => {
  if (levels[level] <= levels[logLevel]) {
    const entry = logEntry(level, arguments)

    console.log(entry)
    fs.write(fs.absolute(logFilePath), entry + '\n', 'a')
  }
}

const logger = (logLevel, logFilePath) => {
  const log = write(logLevel, logFilePath)

  return {
    error: log('error'),
    warn: log('warn'),
    info: log('info'),
    verbose: log('verbose'),
    debug: log('debug'),
    silly: log('silly')
  }
}


module.exports = logger
