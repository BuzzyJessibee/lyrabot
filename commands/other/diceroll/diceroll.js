const funPhrases = require("./funphrases.json")
const diceRollMessage = require("./messages/diceroll.message")
const Dice = require('dice-notation-js');

module.exports = async function (message, {dice}) {
    const roll = Dice.detailed(dice);

    const phrase = funPhrases[Math.floor(Math.random() * funPhrases.length)];

    const description = formatDiceRoll(message, phrase, roll);

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
