const { SlashCommandBuilder } = require('@discordjs/builders');
const baseEmbed = require('../baseEmbed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('See what is currently playing'),

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
    let queue = interaction.client.player.getQueue(interaction.guildId);

    if (queue == undefined) {
      interaction.followUp(':x: | No music is being played!');
      return;
    }

    const video = queue.current;
    let description = playbackBar(queue, video);

    const title = video.title;

    const videoEmbed = baseEmbed()
      .setThumbnail(video.thumbnail)
      .setTitle(`:notes: ${title}`)
      .setURL(video.url)
      .setDescription(description);

    await interaction.followUp({ embeds: [videoEmbed] });

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function playbackBar(queue, video) {
      let progress = queue.createProgressBar();
      let timecodes = progress.split(' ');
      let rawTimePassed = timecodes[0].split(':');
      let passedTimeInMS = 0;

      if (rawTimePassed.length == 1) {
        passedTimeInMS = Number(rawTimePassed[0]) * 1000;
      } else if (rawTimePassed.length == 2) {
        passedTimeInMS =
          Number(rawTimePassed[0]) * 60000 + Number(rawTimePassed[1]) * 1000;
      } else if (rawTimePassed.length == 3) {
        passedTimeInMS =
          Number(rawTimePassed[0]) * 3600000 +
          Number(rawTimePassed[1]) * 60000 +
          Number(rawTimePassed[2]) * 1000;
      }
      const passedTimeInMSObj = {
        seconds: Math.floor((passedTimeInMS / 1000) % 60),
        minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
        hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24),
      };
      const passedTimeFormatted = formatDuration(passedTimeInMSObj);

      const totalDurationFormatted = video.duration;
      let totalDurationInMS = video.durationMS;

      const playBackBarLocation = Math.round(
        (passedTimeInMS / totalDurationInMS) * 10
      );
      let playBack = '';
      for (let i = 1; i < 21; i++) {
        if (playBackBarLocation == 0) {
          playBack = ':musical_note:▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
          break;
        } else if (playBackBarLocation == 10) {
          playBack = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬:musical_note:';
          break;
        } else if (i == playBackBarLocation * 2) {
          playBack = playBack + ':musical_note:';
        } else {
          playBack = playBack + '▬';
        }
      }
      playBack = `${passedTimeFormatted}  ${playBack}  ${totalDurationFormatted}`;
      return playBack;
    }

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function formatDuration(durationObj) {
      const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
        durationObj.minutes ? durationObj.minutes : '00'
      }:${
        durationObj.seconds < 10
          ? '0' + durationObj.seconds
          : durationObj.seconds
          ? durationObj.seconds
          : '00'
      }`;
      return duration;
    }
  },
};
