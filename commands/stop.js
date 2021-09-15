const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the queue'),

  async execute(interaction) {
    await interaction.deferReply();
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    queue.stop();
    return void interaction.followUp({ content: '🛑 | Stopped the player!' });
  },
};
