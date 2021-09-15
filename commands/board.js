const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('board')
    .setDescription(
      'Post something to the Minecraft request board. (Only works in The Dawn Sanctum)'
    )
    .addStringOption((option) =>
      option
        .setName('request')
        .setDescription('What are you requesting (what do you want?)?')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reward')
        .setDescription('What are you giving the person?')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('times')
        .setDescription(
          'How many trades are you offering? (if unsure just type 1)'
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    if (interaction.guildId != '676982133641838593') {
      await interaction.reply({
        content: 'Sorry! This command only works in The Dawn Sanctum!',
        ephemeral: true,
      });
    } else {
      let channel = interaction.client.channels.cache.get('874177449821368360');
      let request = interaction.options.getString('request');
      let reward = interaction.options.getString('reward');
      let times = interaction.options.getInteger('times');

      let embed = baseEmbed()
        .setTitle(`A new request has been posted!`)
        .setDescription(
          `Name: ${interaction.member.user}\nRequest: ${request}\nReward: ${reward}\nNumber available: ${times}`
        );
      await channel.send({ embeds: [embed] });
      await interaction.reply({ content: 'Posted!', ephemeral: true });
    }
  },
};
