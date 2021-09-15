const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cheers')
    .setDescription('Feeling Cheery?'),

  async execute(interaction) {
    let embed = baseEmbed()
      .setTitle('Cheers! :tea:')
      .setImage('https://i.gifer.com/m9V.gif');
    await interaction.reply({ embeds: [embed] });
  },
};
