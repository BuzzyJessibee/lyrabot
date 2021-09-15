const { SlashCommandBuilder } = require('@discordjs/builders');
const { RepeatMode } = require('discord-music-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loop either a track or the queue')
    .addIntegerOption((option) =>
      option
        .setName('mode')
        .setDescription('Loop type')
        .setRequired(true)
        .addChoice('Track', RepeatMode.SONG)
        .addChoice('Queue', RepeatMode.QUEUE)
        .addChoice('Off', RepeatMode.DISABLED)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const queue = interaction.client.player.getQueue(interaction.guildId);

    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });

    const loopMode = interaction.options.get('mode').value;

    const success = queue.setRepeatMode(loopMode);
    const mode =
      loopMode === RepeatMode.SONG
        ? '🔂'
        : loopMode === RepeatMode.QUEUE
        ? '🔁'
        : '▶';
    return void interaction.followUp({
      content: success
        ? `${mode} | Updated loop mode!`
        : '❌ | Could not update loop mode!',
    });
  },
};
