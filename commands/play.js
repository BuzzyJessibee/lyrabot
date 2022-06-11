const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song or playlist!')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('What would you like to play?')
        .setRequired(true)
    ),

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
    const query = interaction.options.getString('query');
    const player = interaction.client.player;
    const guild = interaction.client.guilds.cache.get(interaction.guildId);
    const channel = guild.channels.cache.get(interaction.channelId);
    const searchResult = await player
      .search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .catch((err) => {
        console.log(err);
      });
    if (!searchResult || !searchResult.tracks.length)
      return void interaction.followUp({ content: 'No results were found!' });

    const queue = await player.createQueue(guild, {
      ytdlOptions: {
        filter: 'audioonly',
        highWaterMark: 1 << 30,
        dlChunkSize: 0,
      },
      metadata: channel,
    });
    const member =
      guild.members.cache.get(interaction.user.id) ??
      (await guild.members.fetch(interaction.user.id));
    try {
      if (!queue.connection) await queue.connect(member.voice.channel);
    } catch {
      void player.deleteQueue(interaction.guildId);
      return void interaction.followUp({
        content: 'Could not join your voice channel!',
      });
    }
    await interaction.followUp({
      content: `⏱ | Loading your ${
        searchResult.playlist ? 'playlist' : 'track'
      }...`,
    });
    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();
  },
};
