const bunnyMessage = require("./messages/bunny.message")
const bunnyImages = require("bunnyurls.json")


module.exports = async function (message) {
    var randobun = bunnyImages[Math.floor(Math.random() * bunnyImages.length)]
    await message.say(bunnyMessage(randobun));
}



