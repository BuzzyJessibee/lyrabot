const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('View the queue'),

  async execute(interaction) {
    await interaction.deferReply();
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue || !queue.isPlaying)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });

    const currentTrack = queue.nowPlaying;
    const tracks = queue.songs.slice(1, 11).map((m, i) => {
      return `${i + 1}. **${m.name}** ([link](${m.url}))`;
    });

    return void interaction.followUp({
      embeds: [
        {
          title: 'Server Queue',
          description: `${tracks.join('\n')}${
            queue.songs.length > tracks.length
              ? `\n...${
                  queue.songs.length - tracks.length === 1
                    ? `${queue.songs.length - tracks.length - 1} more track`
                    : `${queue.songs.length - tracks.length - 1} more tracks`
                }`
              : ''
          }`,
          color: '#F399D9',
          fields: [
            {
              name: 'Now Playing',
              value: `🎶 | **${currentTrack.name}** ([link](${currentTrack.url}))`,
            },
          ],
        },
      ],
    });
  },
};
