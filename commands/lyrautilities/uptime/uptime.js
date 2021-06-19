const uptimeMessage = require("./messages/uptime.message")

module.exports = async function (message) {
    let seconds = parseInt((message.client.uptime / 1000) % 60)
    let minutes = parseInt((message.client.uptime / (1000 * 60)) % 60)
    let hours = parseInt((message.client.uptime / (1000 * 60 * 60)) % 24)

    // if there's not two digits, add a 0 to make it prettier
    hours = (hours < 10) ? ('0' + hours) : hours;
    minutes = (minutes < 10) ? ('0' + minutes) : minutes;
    seconds = (seconds < 10) ? ('0' + seconds) : seconds;

    await message.say(uptimeMessage(hours, minutes, seconds));
}
