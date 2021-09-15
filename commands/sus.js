const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sus')
    .setDescription('Lookin kinda sus'),

  async execute(interaction) {
    let embed = baseEmbed()
      .setTitle(`Kinda sus ngl...`)
      .setImage(
        'https://cdn.vox-cdn.com/thumbor/ot2xqOkZU-kuhd4G4fQWkjZs2CU=/0x60:1920x1020/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21874606/Emergency_Meeting.jpg'
      );
    await interaction.reply({ embeds: [embed] });
  },
};
