const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the currently playing song'),

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
    const currentTrack = queue.current.title;
    const success = queue.skip();
    return void interaction.followUp({
      content: success
        ? `✅ | Skipped **${currentTrack}**!`
        : '❌ | Something went wrong!',
    });
  },
};
