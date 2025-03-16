
// Channel Logger module
const logLevels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

class ChannelLogger {
  constructor(channelName, level = 'INFO') {
    this.channelName = channelName;
    this.level = logLevels[level] || logLevels.INFO;
  }

  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${this.channelName}] [${level}] ${message}`;
  }

  debug(message) {
    if (this.level <= logLevels.DEBUG) {
      console.debug(this.formatMessage('DEBUG', message));
    }
  }

  info(message) {
    if (this.level <= logLevels.INFO) {
      console.info(this.formatMessage('INFO', message));
    }
  }

  warn(message) {
    if (this.level <= logLevels.WARN) {
      console.warn(this.formatMessage('WARN', message));
    }
  }

  error(message, error = null) {
    if (this.level <= logLevels.ERROR) {
      console.error(this.formatMessage('ERROR', message));
      if (error) {
        console.error(error);
      }
    }
  }
}

export const createLogger = (channelName, level) => {
  return new ChannelLogger(channelName, level);
};

export default ChannelLogger;
