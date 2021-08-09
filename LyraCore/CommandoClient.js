const Path = require("path");
const {CommandoClient, Command} = require("discord.js-commando");
const log = LyraCore.logger("CommandoClient");
const { Player } = require("discord-music-player");
const Discord = require("discord.js");

module.exports = async function (config) {
    const client = new CommandoClient({
        commandPrefix: config.prefix,
    });

    const player = new Player(client, {
        leaveOnEnd: true,
        leaveOnStop: true,
        leaveOnEmpty: true,
        timeout: 0,
        volume: 150,
        quality: 'high',
    }); // add music support

    client.player = player; // make it accessible through the client variable

    //TODO - make this cleaner lmao | Prob split it off but I'm to lazy to do that atm | She's been down too long
    client.player
        // Emitted when channel was empty.
        .on('channelEmpty',  (message, queue) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle(`The channel is empty, I have stopped the music`)))
        // Emitted when a song was added to the queue.
        .on('songAdd',  (message, queue, song) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle(song.name+' has been added to the queue')))
        // Emitted when a playlist was added to the queue.
        .on('playlistAdd',  (message, queue, playlist) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle(`Added a playlist with ${playlist.videoCount} songs!`)))
        // Emitted when there was no more music to play.
        .on('queueEnd',  (message, queue) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle('The queue has ended!')))
        // Emitted when a song changed.
        .on('songChanged', (message, newSong, oldSong) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle(newSong.name+' is now playing!')))
        // Emitted when a first song in the queue started playing (after play method).
        .on('songFirst',  (message, song) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle(song.name+' is now playing!')))
        // Emitted when someone disconnected the bot from the channel.
        .on('clientDisconnect', (message, queue) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle('I was disconnected!')))
        // Emitted when deafenOnJoin is true and the bot was undeafened
        .on('clientUndeafen', (message, queue) =>
            message.channel.send(new Discord.MessageEmbed().setColor('#0099ff').setTitle('I was undeafened! Please keep me deafened! Thanks :heart:')))
        // Emitted when there was an error with NonAsync functions.
        .on('error', (error, message) => {
            switch (error) {
                // Thrown when the YouTube search could not find any song with that query.
                case 'SearchIsNull':
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Oops... I cant find this song');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the provided YouTube Playlist could not be found.
                case 'InvalidPlaylist':
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Cant find this playlist!');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the provided Spotify Song could not be found.
                case 'InvalidSpotify':
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Cant find this song!');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the Guild Queue does not exist (no music is playing).
                case 'QueueIsNull':
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('There is no music playing right now.');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the Members is not in a VoiceChannel.
                case 'VoiceChannelTypeInvalid':
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('You need to be in a voice channel!');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the current playing song was an live transmission (that is unsupported).
                case 'LiveUnsupported':
                    message.channel.send(`We do not support YouTube Livestreams.`);
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('We dont support Youtube streams!');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the current playing song was unavailable.
                case 'VideoUnavailable':
                    message.channel.send(`Something went wrong while playing the current song, skipping...`);
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Error! Skipping song.');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when provided argument was Not A Number.
                case 'NotANumber':
                    message.channel.send(`The provided argument was Not A Number.`);
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Not a number?');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the first method argument was not a Discord Message object.
                case 'MessageTypeInvalid':
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Not an object!');
                    message.channel.send(exampleEmbed);
                    break;
                // Thrown when the Guild Queue does not exist (no music is playing).
                default:
                    var exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Oops! Unknown Error.');
                    message.channel.send(exampleEmbed);
                    break;
            }
        });

    client.registry
          .registerDefaultTypes()
          .registerGroups([
              ['music', ':notes: Music Command Group:'],
              ['fun', ':game_die: Fun Command Group:'],
              ['rank', ':medal: XP and Rank Related commands'],
              ['lyrautilities', ':gear: Guild Related Commands:']
          ])
          .registerDefaultGroups()
          .registerDefaultCommands({
              eval: false,
              prefix: false,
              commandState: false,
              ping: false,
              help: false
          });

    //============= LOAD COMMANDS =============//
    const commands = flattenObject(require('require-all')({
        dirname: Path.resolve(config.commandDir),
    }));

    //Load all exports in command directory, and filter only those that are Command instances.
    const filteredCommands = Object
        .values(commands)
        .filter((exp) => exp?.prototype instanceof Command)

    client.registry.registerCommands(filteredCommands);

    await client.login(config.token);

    log(`>${client.user.tag}< is ready!`);

    return client
}

const flattenObject = (obj) => {
    const flattened = {}

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, flattenObject(obj[key]))
        } else {
            flattened[key] = obj[key]
        }
    })

    return flattened
}
