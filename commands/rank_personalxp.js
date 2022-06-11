const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');
const lyXP = require('../baseXPSystem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('xppersonal')
    .setDescription('Look up your total XP across all servers!'),

  async execute(interaction) {
    let currentXP = lyXP.calculateTotalPersonalXP(interaction.user.id);
    let embed = baseEmbed()
      .setTitle('Total LyraBot XP')
      .setDescription(
        `Your current total XP across all servers is: **${currentXP} <:lyratoken:930186031821643806>**`
      );
    await interaction.reply({ embeds: [embed] });
  },
};
