const { MessageEmbed } = require('discord.js');

module.exports = async function (message, {query}) {

    const player = message.client.player;
    const voiceChannel = message.member.voice.channel;
    let err = false;

    if (!voiceChannel) {
        await message.say(':no_entry: Please join a voice channel and try again!');
        return;
    }
    if (
        // Handles PlayList Links
        query.match(
            /^(?!.*\?.*\bv=)https:\/\/((w){3}.|)youtube\.com\/.*\?.*\blist=.*$/
        )
    ) {
        let playlist = await message.client.player.playlist(message, {
            search: query,
            maxSongs: -1
        });

        if (playlist) {
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
            let thesong = await message.client.player.play(message, {
                search: query,
                requestedBy: message.author.tag
            });

            let queue = message.client.player.getQueue(message);

            if(queue) {
                var mapQueue;
                mapQueue = queue.songs.map((song, i) => {
                    return `${song.name}`
                }); 
            }
  
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

        } else {
        
            let song = await message.client.player.play(message, {
                search: query,
                requestedBy: message.author.tag
            });

            if(song) {
                console.log(`Playing ${song.name} in guild ${message.guild.name}`);
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