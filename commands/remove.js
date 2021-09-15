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
    await interaction.deferReply();
    const songID = interaction.options.getInteger('songnumber');
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    const success = queue.remove(songID - 1);
    return void interaction.followUp({
      content: success
        ? `✅ | Removed track **${songID}** from the queue!`
        : '❌ | Something went wrong!',
    });
  },
};
