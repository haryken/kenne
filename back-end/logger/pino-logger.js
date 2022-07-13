const logger = require('pino');
const dayjs = require('dayjs');

const pinoLog = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

module.exports = pinoLog;
