const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NowPlayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'nowplaying',
      group: 'music',
      memberName: 'nowplaying',
      aliases: ['np', 'currently-playing', 'now-playing'],
      guildOnly: true,
      description: 'Display the currently playing song!'
    });
  }

  async run(message) {

    const video = await message.client.player.nowPlaying(message);
    let description = NowPlayingCommand.playbackBar(message, video);

    const title = video.name;

    const videoEmbed = new MessageEmbed()
    .setThumbnail(video.thumbnail)
    .setColor('#32A8A0')
    .setTitle(`:notes: ${title}`)
    .setURL(video.url)
    .setDescription(description)
    .setFooter(`LyraBot - Made with ❤️ by Lyra Rose`);
    message.channel.send(videoEmbed);
    return;
  }

  static playbackBar(message, video) {
    let queue = message.client.player.queues.get(message.guild.id);
    const passedTimeInMS = queue.dispatcher.streamTime;
    const passedTimeInMSObj = {
      seconds: Math.floor((passedTimeInMS / 1000) % 60),
      minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
      hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24)
    };
    const passedTimeFormatted = NowPlayingCommand.formatDuration(
      passedTimeInMSObj
    );

    const totalDurationObj = video.duration;
    console.log(video.duration);
    const totalDurationFormatted = video.duration;

    let totalDurationInMS = 0;
    let rawDuration = video.duration.split(':');
    console.log(rawDuration);
    console.log(rawDuration.length);
    if (rawDuration.length == 1) {
        totalDurationInMS = Number(rawDuration[0]) * 1000;
    } else if (rawDuration.length == 2) {
        totalDurationInMS = (Number(rawDuration[0]) * 60000) + (Number(rawDuration[1]) * 1000);
        console.log(totalDurationInMS);
    } else if (rawDuration.length == 3) {
        totalDurationInMS = (Number(rawDuration[0]) * 3600000) + (Number(rawDuration[1]) * 60000) + (Number(rawDuration[2]) * 1000);
    }
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

  static formatDuration(durationObj) {
      const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
        durationObj.minutes ? durationObj.minutes : '00'
      }:${
        (durationObj.seconds < 10)
          ? ('0' + durationObj.seconds)
          : (durationObj.seconds
          ? durationObj.seconds
          : '00')
      }`;
      return duration;
    }

}

