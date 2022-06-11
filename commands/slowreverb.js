const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowreverb')
    .setDescription('Toggle the -Slow & Reverb- filter'),

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
    await queue.setFilters({
      vaporwave: !queue.getFiltersEnabled().includes('vaporwave'),
      surrounding: !queue.getFiltersEnabled().includes('vaporwave'),
    });

    setTimeout(() => {
      return void interaction.followUp({
        content: `🎵 | 𝓼𝓵𝓸𝔀 𝓪𝓷𝓭 𝓻𝓮𝓿𝓮𝓻𝓫 filter ${
          queue.getFiltersEnabled().includes('vaporwave')
            ? 'Enabled'
            : 'Disabled'
        }!`,
      });
    }, queue.options.bufferingTimeout);
  },
};
