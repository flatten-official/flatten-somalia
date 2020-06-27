const winston = require("winston");
const GCPLogging = require("@google-cloud/logging-winston");

const { transports, format } = winston;

const messageFormat = format.printf((info) => {
  if (info.httpRequest) {
    // exclude token from log, if one is present
    if (info.httpRequest.requestUrl.indexOf("token?")) {
      info.httpRequest.requestUrl = info.httpRequest.requestUrl.split("?")[0];
    }
    info.message = `Done with HTTP request on ${info.httpRequest.requestUrl}\n`;
  }

  if (info.method && info.path)
    info.message += info.method.padEnd(8, " ") + info.path;

  if (info.status)
    info.message = `Response status: ${info.status}. ${info.message}`;

  if (info.error) info.message += ` ${info.error}`;
});

const defaultFormat = format.combine(
  format.timestamp(),
  messageFormat,
  format.json()
);

const consoleFormat = format.combine(
  format.colorize(),
  format.printf((info) => {
    const time = info.timestamp.split("T")[1].slice(0, 8);

    return `\u001b[7m\u001b[37m[${time}] \u001b[0m${
      info.level + " \t" + info.message
    }`;
  })
);

// consistent with GCP severity levels
const logSeverityLevels = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const inverseColours = {
  emergency: "magenta bold inverse",
  alert: "magenta inverse",
  critical: "red bold inverse",
  error: "red inverse",
  warning: "yellow inverse",
  notice: "green inverse",
  info: "cyan inverse",
  debug: "blue inverse",
};

function makeConsoleTransport(level, format) {
  return new transports.Console({
    levels: logSeverityLevels,
    level: level,
    format: format ? format : consoleFormat,
  });
}

function makeStackdriverTransport(level) {
  return new GCPLogging.LoggingWinston({
    levels: logSeverityLevels,
    level,
  });
}

function setup() {
  winston.addColors(inverseColours);

  winston.loggers.add("custom", {
    levels: logSeverityLevels,
    format: defaultFormat,
    transports: [
      makeConsoleTransport("debug"),
      makeStackdriverTransport("info"),
    ],
  });
}

/* This middleware enables logging using req.log.info(...),
 * which allow logs from the same request to be grouped on GCP.
 *
 * Relies on the setup function having been called.
 */
async function makeRequestLoggingMiddleware() {
  return await GCPLogging.express.makeMiddleware(
    log,
    makeStackdriverTransport("info")
  );
}

setup();
const log = winston.loggers.get("custom");
log.debug("Logger configuration complete.");

module.exports = { log, makeRequestLoggingMiddleware };
