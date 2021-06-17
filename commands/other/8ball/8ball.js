const messageBuilder = require("./messages/8ball.message")
const answers = require("./8ballAnswers.json");

module.exports = async function (message, {question}) {
    let answer = answers[Math.floor(Math.random() * answers.length)];
    await message.say(messageBuilder(question, answer));
    await message.say(messageBuilder(question, answer));
}
