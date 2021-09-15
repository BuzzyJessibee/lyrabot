const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume a paused queue'),

  async execute(interaction) {
    await interaction.deferReply();
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    const paused = queue.setPaused(false);
    return void interaction.followUp({
      content: !paused ? '❌ | Something went wrong!' : '▶ | Resumed!',
    });
  },
};
