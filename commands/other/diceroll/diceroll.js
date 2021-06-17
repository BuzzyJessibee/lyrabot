const funPhrases = require("./funphrases.json")
const diceRollMessage = require("./messages/diceroll.message")
const Dice = require('dice-notation-js');

module.exports = async function (message, { dice }) {

    let roll = Dice.detailed(dice)

    var phrase = funPhrases[Math.floor(Math.random() * funPhrases.length)];

    let description = formatDiceRoll(message, phrase, roll);

    await message.say(diceRollMessage(description));
    
}

function formatDiceRoll(message, phrase, roll) {
    console.log(roll)
    const {
        number,
        type,
        modifier,
        rolls,
        result
    } = roll;

    const base = `${phrase}\n\n` +
        `Player: ${message.author.username}\n` +
        `Dice Rolled: ${number}d${type}\n`

    if (!modifier && number === 1)
        return `${base}\n\n**You've rolled a \`${result}\`!**`

    else if (!modifier && number !== 1)
        return `${base}Modifier: ${modifier}\n\n**You've rolled \`${rolls}\`!\nYour total is: \`${result}\`!**`

    else if (modifier && number === 1)
        return `${base}\n\n**You've rolled a \`${result}\`!**`

    else if (modifier && number !== 1)
        return `${base}Modifier: ${modifier}\n\nYou've rolled \`${rolls}\`!\nYour total is: \`${result}\`!**`

}