const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a song from the queue')
    .addIntegerOption((option) =>
      option
        .setName('songnumber')
        .setDescription('Track number of the song to delete')
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: 'You are not in a voice channel!',
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });
    await interaction.deferReply();
    const songID = interaction.options.getInteger('songnumber');
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    const success = queue.remove(songID - 1);
    return void interaction.followUp({
      content: success
        ? `✅ | Removed track **${songID}** | **${success.title}** from the queue!`
        : '❌ | Something went wrong!',
    });
  },
};
