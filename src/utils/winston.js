const winston = require("winston");
const GCPLogging = require("@google-cloud/logging-winston");
const { transports, format } = winston;

//region Utilities

/** Format log entries' message property.
 * Deals with
 *   - displaying metadata, if available, in the message
 */
const messageFormat = format.printf((info) => {
  // display return status for final log entry in submission routes
  if (info.status)
    info.message = `Response status: ${info.status}. ${info.message}`;
});

// Add error info to the log message.
function errorFormat(stack = false) {
  return format.printf((info) => {
    if (info.error) {
      info.message += info.level === "info" ? " Error: " : "";
      if (stack) {
        info.message += `\n\u001b[31m${info.error.stack}\u001b[0m`;
      } else {
        info.message += `\u001b[31m${info.error}\u001b[0m`;
      }
    }
  });
}

const defaultFormat = format.combine(
  format.timestamp(),
  messageFormat,
  format.json()
);

const consoleFormat = format.combine(
  defaultFormat,
  errorFormat(false),
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
    handleExceptions: true,
    handleRejections: true,
  });
}

function makeStackdriverTransport(level) {
  return new GCPLogging.LoggingWinston({
    levels: logSeverityLevels,
    level,
    format: defaultFormat,
    handleExceptions: true,
    handleRejections: true,
  });
}

function makeTransports(env = process.env.ENVIRONMENT) {
  switch (env) {
    case "production":
      return [makeStackdriverTransport("info")];
    case "staging":
      return [makeStackdriverTransport("debug")];
    default:
      return [makeConsoleTransport("debug")];
  }
}

//endregion

function setup() {
  winston.addColors(inverseColours);

  winston.loggers.add("custom", {
    levels: logSeverityLevels,
    exitOnError: false,
    transports: makeTransports(),
  });

  return winston.loggers.get("custom");
}

const log = setup();

log.debug("Logger configuration complete.");

module.exports = { log };
