const winston = require("winston");
const GCPLogging = require("@google-cloud/logging-winston");
const { transports, format } = winston;

//region Utilities

const makeConsoleRed = (message) => `\u001b[31m${message}\u001b[0m`;
const makeConsoleGrey = (message) => `\u001b[7m\u001b[37m${message}\u001b[0m`;

/** Format log entries' message property.
 * Deals with
 *   - displaying metadata, if available, in the message
 */
const messageFormat = (colorize) =>
  format.printf((info) => {
    // display return status for final log entry in submission routes
    if (info.status)
      info.message = `Response status: ${info.status}. ${info.message}`;

    if (info.error)
      info.message +=
        "\n" + colorize ? makeConsoleRed(info.error.stack) : info.error.stack;
  });

const defaultFormat = (colorize) =>
  format.combine(format.timestamp(), messageFormat(colorize), format.json());

const consoleFormat = format.combine(
  defaultFormat(true),
  format.colorize(),
  format.printf((info) => {
    const time = info.timestamp.split("T")[1].slice(0, 8);

    return makeConsoleGrey(time) + " " + info.level + " \t" + info.message;
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

const makeStackdriverTransport = (level) =>
  new GCPLogging.LoggingWinston({
    levels: logSeverityLevels,
    level,
  });

function makeTransports(env = process.env.ENVIRONMENT) {
  switch (env) {
    case "production":
      return [makeStackdriverTransport("info")];
    case "staging":
      return [makeStackdriverTransport("debug")];
    default:
      return [makeConsoleTransport("debug"), makeStackdriverTransport("debug")];
  }
}

//endregion

function setup() {
  winston.addColors(inverseColours);

  return winston.createLogger({
    levels: logSeverityLevels,
    exitOnError: false,
    transports: makeTransports(),
  });
}

const log = setup();

log.debug("Logger configuration complete.");

module.exports = { log };
