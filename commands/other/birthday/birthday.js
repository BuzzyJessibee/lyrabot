const birthdayMessage = require("./messages/birthday.message.js")

module.exports = async function (message, {user}) {
    await message.say(birthdayMessage(user));
}




