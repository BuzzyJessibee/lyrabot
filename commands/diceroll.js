const baseEmbed = require('../baseEmbed');
const funPhrases = require('./json/funphrases.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Dice = require('dice-notation-js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('Rolls a dice.')
    .addIntegerOption((option) =>
      option.setName('dice').setDescription('Number of dice').setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('sides')
        .setDescription('Number of sides')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('modifier').setDescription('+ or - and then your modifier')
    ),

  async execute(interaction) {
    let dice = interaction.options.getInteger('dice');
    let sides = interaction.options.getInteger('sides');
    let modifier = interaction.options.getString('modifier');
    let parsedString;

    if (dice <= 0 || sides <= 0) {
      interaction.reply(":x: | Number of Dice or Sides can't be less than 1!");
      return;
    }

    if (dice >= 21 || sides >= 21) {
      interaction.reply(":x: | Number of Dice or Sides can't be more than 20!");
      return;
    }
    if (modifier >= 100) {
      interaction.reply(":x: | Modification can't be more than 100!");
      return;
    }

    if (modifier) {
      parsedString = `${dice}d${sides}${modifier}`;
    } else {
      parsedString = `${dice}d${sides}`;
    }

    const roll = Dice.detailed(parsedString);

    const phrase = funPhrases[Math.floor(Math.random() * funPhrases.length)];

    const description = formatDiceRoll(interaction, phrase, roll);

    let embed = baseEmbed()
      .setTitle(':game_die: | Dice Roll!')
      .setDescription(description);

    await interaction.reply({ embeds: [embed] });
  }
};

function formatDiceRoll(interaction, phrase, roll) {
  const { number, type, modifier, rolls, result } = roll;

  const base =
    `${phrase}\n\n` +
    `Player: ${interaction.member.user.username}\n` +
    `Dice Rolled: ${number}d${type}\n`;

  if (!modifier && number === 1) {
    return `${base}\n\n**You've rolled a \`${result}\`!**`;
  } else if (!modifier && number !== 1) {
    return `${base}\n\n**You've rolled \`${rolls}\`!\nYour total is: \`${result}\`!**`;
  } else if (modifier && number === 1) {
    return `${base}Modifier: ${modifier}\n\n**You've rolled a \`${result}\`!**`;
  } else if (modifier && number !== 1) {
    return `${base}Modifier: ${modifier}\n\n**You've rolled \`${rolls}\`!\nYour total is: \`${result}\`!**`;
  }
}
