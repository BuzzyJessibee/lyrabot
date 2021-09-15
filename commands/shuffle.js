const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle the queue'),

  async execute(interaction) {
    await interaction.deferReply();
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    const success = queue.shuffle();
    return void interaction.followUp({
      content: success
        ? `✅ | Shuffled the queue!`
        : '❌ | Something went wrong!',
    });
  },
};
