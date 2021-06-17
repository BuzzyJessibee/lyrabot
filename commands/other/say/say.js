const sayMessage = require("./messages/say.message")
 
 
module.exports = async function (message, {text}) {
    message.delete();
    await message.say(sayMessage(text));
};
