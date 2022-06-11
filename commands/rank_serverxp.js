const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');
const lyXP = require('../baseXPSystem');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('xpserver')
    .setDescription('Look up your current XP in the current server!'),

  async execute(interaction) {
    let currentXP = lyXP.retrieveUserGuildXP(interaction);
    let embed = baseEmbed()
      .setTitle('Current Guild XP')
      .setDescription(
        `Your current guild XP in ${interaction.guild.name} is: **${currentXP} <:lyratoken:930186031821643806>**`
      );
    await interaction.reply({ embeds: [embed] });
  },
};
