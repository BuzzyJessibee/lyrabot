const baseEmbed = require('../baseEmbed');
const bunnyImages = require('./json/bunnyurls.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bunny')
    .setDescription('Get a picture of a rabbit!'),

  async execute(interaction) {
    const randomBunnyUrl =
      bunnyImages[Math.floor(Math.random() * bunnyImages.length)];
    let embed = baseEmbed()
      .setTitle('Bunnies! :rabbit2:')
      .setImage(randomBunnyUrl);
    await interaction.reply({ embeds: [embed] });
  },
};
