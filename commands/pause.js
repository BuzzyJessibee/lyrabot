const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the currently playing song'),

  async execute(interaction) {
    await interaction.deferReply();
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    const paused = queue.setPaused(true);
    return void interaction.followUp({
      content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!',
    });
  },
};
