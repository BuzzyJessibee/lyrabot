const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the queue'),

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
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    queue.stop();
    return void interaction.followUp({ content: '🛑 | Stopped the player!' });
  },
};
