const rpsMessage = require("./messages/rps.message")
 
 
module.exports = async function (message, {move}) {
    const replies = [':rock: Rock', ':pencil: Paper', ':scissors: Scissors'];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    await message.say(rpsMessage(reply));

};
