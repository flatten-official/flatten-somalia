const winston = require("winston");
const {
  LoggingWinston: StackdriverTransport,
} = require("@google-cloud/logging-winston");

const { transports, format } = winston;

const defaultFormat = format.combine(format.timestamp(), format.json());

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf((info) => {
    const time = info.timestamp.split("T")[1].slice(0, 8);

    if (info.message === "Incoming request.")
      info.message = info.method.padEnd(8, " ") + info.path;

    return `\u001b[47m\u001b[97m[${time}] \u001b[0m${
      info.level + " \t" + info.message
    }`;
  })
);

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
  emergency: ["red", "inverse"],
  alert: ["red", "inverse"],
  critical: ["red", "inverse"],
  error: ["red", "inverse"],
  warning: ["yellow", "inverse"],
  notice: ["green", "inverse"],
  info: ["green", "inverse"],
  debug: ["magenta", "inverse"],
};

function setup() {
  winston.addColors(inverseColours);

  winston.loggers.add("custom", {
    levels: logSeverityLevels,
    transports: [
      new transports.Console({
        level: "debug",
        format: consoleFormat,
      }),
      // new transports.Console({
      //   level: "debug",
      //   format: defaultFormat,
      // }),
      // new StackdriverTransport({
      //   levels: logSeverityLevels,
      //   level: "debug",
      //   format: defaultFormat,
      // }),
    ],
  });

  getLogger().info("Logger configuration complete.");
}

function getLogger() {
  return winston.loggers.get("custom");
}

module.exports = { setup, getLogger };
