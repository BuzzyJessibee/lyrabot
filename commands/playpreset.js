const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playpreset')
    .setDescription('Plays a preset song playlist!')
    .addStringOption((option) =>
      option
        .setName('playlist')
        .setDescription('Preset Playlists')
        .setRequired(true)
        .addChoice('Animal Crossing - Relaxing Music With Soft Rain', 'acrain')
        .addChoice('Super Mario Galaxy OST', 'smg')
        .addChoice('Undertale OST', 'ut')
        .addChoice('Pokemon Unova Tunes', 'unova')
        .addChoice('Vocaloid Mixes', 'vocamix')
        .addChoice('Deltarune Chapter 1&2 OST', 'delta')
        .addChoice('Super Mario Odyssey OST', 'smo')
        .addChoice('Splatoon 2 OST', 'splat2')
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
    const query = interaction.options.get('playlist').value;
    const player = interaction.client.player;
    const guild = interaction.client.guilds.cache.get(interaction.guildId);
    const channel = guild.channels.cache.get(interaction.channelId);
    let playlistlink = '';

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
      return void interaction.sendFollowUp({
        content: 'Could not join your voice channel!',
      });
    }

    switch (query) {
      case 'smg':
        playlistlink =
          'https://www.youtube.com/playlist?list=PLYzPRovwO_fMpV228teVsJpirCd424-ql';
        break;
      case 'ut':
        playlistlink =
          'https://www.youtube.com/playlist?list=PLpJl5XaLHtLX-pDk4kctGxtF4nq6BIyjg';
        break;
      case 'unova':
        playlistlink =
          'https://www.youtube.com/playlist?list=PLGPuPeh0Qf1_R8R1tg_jn5PkYhruFJbJl';
        break;
      case 'delta':
        playlistlink =
          'https://www.youtube.com/playlist?list=PLEUKcNuP7bDX9RoW3HqYR6EFvWZh12upZ';
        break;
      case 'vocamix':
        playlistlink =
          'https://youtube.com/playlist?list=PLZJRG_7HMOH7cIXgyqYnwJ_3TApsNe4oh';
        break;
      case 'smo':
        playlistlink =
          'https://www.youtube.com/playlist?list=PLwDEuPBgBi4OX323eK2xiASKb5Cfk4QBE';
        break;
      case 'splat2':
        playlistlink =
          'https://www.youtube.com/playlist?list=PLTY-fHX-ZIGy0s1pQwjRctDIzVOBkJIrk';
        break;
      case 'acrain':
        playlistlink =
          'https://soundcloud.com/tenpers/animal-crossing-relaxing-music-with-soft-rain';
    }

    const searchResult = await player
      .search(playlistlink, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .catch((err) => {
        console.log(err);
      });
    if (!searchResult || !searchResult.tracks.length)
      return void interaction.followUp({
        content: "No results were found! - This shouldn't happen! Tell Lyra!",
      });

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
