const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('birthday')
    .setDescription('Wish someone a Happy Birthday!')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription(
          'User tag of the person that you want the birthday wishes to go to!'
        )
    ),
  async execute(interaction) {
    let user;

    if (!interaction.options.getUser('user')) {
      user = interaction.member.user;
    } else {
      user = interaction.options.getUser('user');
    }

    let embed = baseEmbed()
      .setTitle(":tada: | Lyra's Birthday Wishes!")
      .setDescription(
        `Happy Birthday ${user}!
                            I hope you have a fantastic day, and that your year is full of magic!`
      )
      .setThumbnail(
        'http://www.emoji.co.uk/files/emoji-one/food-drink-emoji-one/1646-birthday-cake.png'
      );
    await interaction.reply({ embeds: [embed] });
  },
};
