const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['play-song', 'add', 'p'],
      memberName: 'play',
      group: 'music',
      description: 'Play any song or playlist from youtube!',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'query',
          prompt: ':notes: What song or playlist would you like to listen to?',
          type: 'string',
          validate: function(query) {
            return query.length > 0 && query.length < 200;
          }
        }
      ]
    });
  }

  async run(message, { query }) {
    const player = message.client.player;
    const voiceChannel = message.member.voice.channel;
    let err = false;

    if (!voiceChannel) {
      message.say(':no_entry: Please join a voice channel and try again!');
      return;
    }
    if (
      // Handles PlayList Links
      query.match(
        /^(?!.*\?.*\bv=)https:\/\/((w){3}.|)youtube\.com\/.*\?.*\blist=.*$/
      )
    ) {
      let playlist = await player.playlist(message, {
        search: query,
        maxSongs: 250
      });

      if( player.on('error', (error, message) => {
        PlayCommand.errorHandler(error, message)
      }) ) {
        err = true;
      }

      if (err) {
        return;
      } else {
        const PlayListEmbed = new MessageEmbed()
        .setColor('#32A8A0')
        .setTitle(`:musical_note: ${playlist.name}`)
        .addField(
          `Playlist has added ${playlist.videoCount} songs to queue!`,
          playlist.url
        )
        .setURL(playlist.url)
        .setFooter(`LyraBot - Made with ❤️ by Lyra Rose`);
  
        return message.channel.send(PlayListEmbed);
      }
    } else {
        if(player.isPlaying(message)) {
          let thesong = await player.addToQueue(message, query);

          if( player.on('error', (error, message) => {
            PlayCommand.errorHandler(error, message)
          })) 
          {
            err = true;
          }
    
          if (err) {
            return;
          } else {

          let queue = message.client.player.getQueue(message);
          if(queue)
          var mapQueue;
          mapQueue = queue.songs.map((song, i) => {
              return `${song.name}`
          }); 
    
          const addedEmbed = new MessageEmbed()
          .setColor('#32A8A0')
          .setTitle(`:musical_note: ${thesong.name}`)
          .addField(
            `Has been added to queue. `,
            `This song is #${mapQueue.length} in queue`
          )
          .setThumbnail(thesong.thumbnail)
          .setURL(thesong.url)
          .setFooter(`LyraBot - Made with ❤️ by Lyra Rose`);

          return message.channel.send(addedEmbed);
          }
      } else {
          let song = await player.play(message, query);

          if( player.on('error', (error, message) => {
            PlayCommand.errorHandler(error, message)
          }) ) {
            err = true;
          }
    
          if (err) {
            return;
          } else {
          const videoEmbed = new MessageEmbed()
              .setThumbnail(song.thumbnail)
              .setColor('#32A8A0')
              .addField(':notes: Now Playing:', song.name)
              .addField(':stopwatch: Duration:', song.duration)
              .setURL(song.url)
              .setFooter(
                `Requested by ${song.queue.initMessage.author.username}!`,
                song.queue.initMessage.author.avatarURL()
              );
          return message.channel.send(videoEmbed);
              }
      }
    }
  }

static errorHandler(error) {
    if (error == 'SearchIsNull') {
      return true;
      
    } else if (error == 'InvalidPlaylist') {
      return true;
      
    } else if (error == 'InvalidSpotify') {
        return true;
    }
  }
}; 