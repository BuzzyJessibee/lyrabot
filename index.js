global.BaseEmbed = require("./Base/BaseEmbed.js")
global.logger = require("./Base/logging.js")
global.buildCommand = require("./Base/buildCommand.js")

const {CommandoClient} = require('discord.js-commando');
const path = require('path');
const {Command} = require("discord.js-commando");
const {prefix, token, mongodb} = require('./config.json');


// const Levels = require("discord-xp");
// Levels.setURL(mongodb);
const {Player} = require("discord-music-player");

const client = new CommandoClient({
    commandPrefix: prefix
});

client.player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    timeout: 0,
    volume: 150,
    quality: 'high',
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

const commands = flattenObject(require('require-all')({
    dirname: path.resolve(__dirname, 'commands'),
}))


const filteredCommands = Object
    .values(commands)
    .filter((exp) => exp?.prototype instanceof Command)

console.log(filteredCommands)

client.registry.registerCommands(filteredCommands);


client.once('ready', () => {
    client.user.setActivity('intently | use ly!ra', {type: 'WATCHING'})
    setInterval(() => {
        client.user.setActivity('intently | use ly!ra', {type: 'WATCHING'})
    }, 10000);
    console.log(`${client.user.tag} is Ready!`);
    const Guilds = client.guilds.cache.map(guild => guild.name);
    console.log(Guilds, 'Connected!');
});


// client.on("message", async (message) => {
//   if (!message.guild) return;
//   if (message.author.bot) return;
//
//   const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
//   const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
//   if (hasLeveledUp) {
//     const user = await Levels.fetch(message.author.id, message.guild.id);
//     message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
//   }
// });

client.player
      .on('error', (error, message) => {
          switch (error) {
              // Thrown when the YouTube search could not find any song with that query.
              case 'SearchIsNull':
                  message.channel.send(`No song with that query was found.`);
                  break;
              // Thrown when the provided YouTube Playlist could not be found.
              case 'InvalidPlaylist':
                  message.channel.send(`No Playlist was found with that link.`);
                  break;
              // Thrown when the provided Spotify Song could not be found.
              case 'InvalidSpotify':
                  message.channel.send(`No Spotify Song was found with that link.`);
                  break;
              // Thrown when the Guild Queue does not exist (no music is playing).
              case 'QueueIsNull':
                  message.channel.send(`There is no music playing right now.`);
                  break;
              // Thrown when the Members is not in a VoiceChannel.
              case 'VoiceChannelTypeInvalid':
                  message.channel.send(`You need to be in a Voice Channel to play music.`);
                  break;
              // Thrown when the current playing song was an live transmission (that is unsupported).
              case 'LiveUnsupported':
                  message.channel.send(`We do not support YouTube Livestreams.`);
                  break;
              // Thrown when the current playing song was unavailable.
              case 'VideoUnavailable':
                  message.channel.send(`Something went wrong while playing the current song, skipping...`);
                  break;
              // Thrown when provided argument was Not A Number.
              case 'NotANumber':
                  message.channel.send(`The provided argument was Not A Number.`);
                  break;
              // Thrown when the first method argument was not a Discord Message object.
              case 'MessageTypeInvalid':
                  message.channel.send(`The Message object was not provided.`);
                  break;
              // Thrown when the Guild Queue does not exist (no music is playing).
              default:
                  message.channel.send(`**Unknown Error Ocurred:** ${error}`);
                  break;
          }
      });

client.login(token);
