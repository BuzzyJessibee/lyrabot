const cheersMessage = require("./messages/cheers.message")

module.exports = async function (message) {
    await message.say(cheersMessage());
}