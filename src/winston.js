const winston = require("winston");
const { transports, format } = winston;

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    const time = timestamp.split("T")[1].slice(0, 8);

    return `\u001b[47m\u001b[97m[${time}] \u001b[0m${level + " \t" + message}`;
  })
);

const inverseColours = {
  error: ["red", "inverse"],
  warn: ["yellow", "inverse"],
  info: ["green", "inverse"],
  verbose: ["blue", "inverse"],
  debug: ["magenta", "inverse"],
};

function setup() {
  winston.addColors(inverseColours);

  winston.configure({
    transports: [
      new transports.Console({
        level: "debug",
        format: consoleFormat,
      }),
    ],
  });

  winston.verbose("configured tha logger");
}

module.exports = { setup };
