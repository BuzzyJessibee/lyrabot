const bunnyMessage = require("./messages/bunny.message")
const bunnyImages = require("./bunnyurls.json")

module.exports = async function (message) {
    const randomBunnyUrl = bunnyImages[Math.floor(Math.random() * bunnyImages.length)]
    await message.say(bunnyMessage(randomBunnyUrl));
    //    await randomBunnyUrl |> bunnyMessage |> message.say; // ME WANT :D
}



