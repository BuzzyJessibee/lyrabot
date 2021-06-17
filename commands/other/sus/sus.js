const susMessage = require("./messages/sus.message")
 
module.exports = async function (message) {
    await message.say(susMessage());
};
