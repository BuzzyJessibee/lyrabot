const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say anything!')
    .addStringOption((option) =>
      option
        .setName('statement')
        .setDescription('What should I say?')
        .setRequired(true)
    ),

  async execute(interaction) {
    let text = interaction.options.getString('statement');

    let embed = baseEmbed()
      .setTitle(`Just wanted to say...`)
      .setDescription(text);

    await interaction.reply({ embeds: [embed] });
  },
};
