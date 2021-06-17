const quoteArray = require("./motivational.json")
const motivationMessage = require("./messages/motivation.message")

module.exports = async function (message) {
  const randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
  await message.channel.send(motivationMessage(randomQuote));
}
