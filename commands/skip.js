const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the currently playing song'),

  async execute(interaction) {
    await interaction.deferReply();
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    const currentTrack = queue.nowPlaying.name;
    const success = queue.skip();
    return void interaction.followUp({
      content: success
        ? `✅ | Skipped **${currentTrack}**!`
        : '❌ | Something went wrong!',
    });
  },
};
