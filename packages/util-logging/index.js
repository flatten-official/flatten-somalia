const winston = require("winston");
const GCPLogging = require("@google-cloud/logging-winston");
const { transports, format } = winston;
const { getConfig } = require("util-config");

//region Utilities

const makeConsoleGrey = (message) => `\u001b[7m\u001b[37m${message}\u001b[0m`;

/** Format log entries' message property.
 * Deals with
 *   - displaying metadata, if available, in the message
 */
const messageFormat = format.printf((info) => {
  // display return status for final log entry in submission routes
  if (info.status)
    info.message = `Response status: ${info.status}. ${info.message}`;

  if (info.error) info.message += "\n" + info.error.stack;
});

const baseFormat = format.combine(
  format.timestamp(),
  messageFormat,
  format.json()
);

const additionalConsoleFormat = format.combine(
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

function makeConsoleTransport(level) {
  return new transports.Console({
    levels: logSeverityLevels,
    format: additionalConsoleFormat,
    level: level,
    handleExceptions: true,
    handleRejections: true,
  });
}

const makeStackdriverTransport = (level) =>
  new GCPLogging.LoggingWinston({
    levels: logSeverityLevels,
    level,
  });

const makeTransports = () => {
  // Uncomment this line to allow for testing with stackdriver logging
  // return [makeConsoleTransport("debug"), makeStackdriverTransport("debug")];

  const minLevel = getConfig().minimumLogLevel || "debug";
  const useStackdriver = getConfig().useStackdriver || false;

  return [
    useStackdriver
      ? makeStackdriverTransport(minLevel)
      : makeConsoleTransport(minLevel),
  ];
};

//endregion

function setup() {
  winston.addColors(inverseColours);

  return winston.createLogger({
    format: baseFormat,
    levels: logSeverityLevels,
    exitOnError: false,
    transports: makeTransports(),
  });
}

const log = setup();

module.exports = { log };
