const winston = require("winston");
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
      new transports.Console({
        level: "debug",
        format: defaultFormat,
      }),
    ],
  });

  winston.verbose("configured tha logger");
}

module.exports = { setup };
