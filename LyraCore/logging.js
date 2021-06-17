const winston = require("winston");

const loggerLevels = {
    fatal: 0,
    alert: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5,
    net: 6,
    silly: 7,
};

const loggerColors = {
    fatal: "bold black redBG",
    alert: "bold red",
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "yellow",
    net: "blue",
    silly: "magenta",
};

winston.addColors(loggerColors);

const format = winston.format.printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] - ${level}: ${message}`;
});

const testFormat = winston.format.combine(
    winston.format(info => {
        info.level = info.level.toUpperCase();
        return info;
    })(),
    winston.format.colorize(),
    winston.format.timestamp(), //TODO: Fix this ugly AF timestamp
    format
);

const logging = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: testFormat,
    levels: loggerLevels,
});

module.exports = function logger(moduleName) {
    return function log(msg, level = "info") {
        logging.log({
            level: level,
            message: msg,
            label: moduleName
        });
    };
}
