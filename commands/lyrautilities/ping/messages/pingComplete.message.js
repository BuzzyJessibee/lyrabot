module.exports = function (phrase, time1, time2) {
    return `${phrase}\n:ping_pong: | Pong! The message round-trip took **${time1 - time2}ms.**`
}