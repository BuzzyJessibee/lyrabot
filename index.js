const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, ytdlcookie } = require('./config.json');
const lyraXP = require('./baseXPSystem.js');
const request = require('request');
//remember clientID is the Bot's ID

// Set up Discord Client with Intents
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// New Music Player Instance
const { Player } = require('discord-player');

const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnEmpty: true,
  ytdlOptions: {
    requestOptions: {
      headers: {
        cookie: ytdlcookie,
      },
    },
  },
});

// make it so the music player can be grabbed by just having the client
client.player = player;

// Register commands.
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  //For some reason discord API resets the Activity, so I have to reset it every few minutes.
  client.user.setActivity('music to pass time', { type: 'LISTENING' });
  setInterval(() => {
    client.user.setActivity('music to pass time', { type: 'LISTENING' });
  }, 10000);

  // Start Up Sequence
  console.log(`${client.user.tag} is Ready!`);
  const Guilds = client.guilds.cache.map((guild) => guild.name);
  console.log(Guilds, '\nConnected!');
});

client.on('messageCreate', async (message) => {
  // Give the user XP
  lyraXP.giveMessageXP(message);

  // TheSummoning - Returns a inspirobot image when using that emoji
  if (message.content.includes(':OrdainedSpiritualistMarionHedger:')) {
    request
      .get('http://inspirobot.me/api?generate=true')
      .on('data', function (data) {
        let image_url;
        image_url = data.toString();
        message.channel.send(image_url);
      })
      .on('error', function (err) {
        return console.error(err);
      });
  }
});

client.on('interactionCreate', async (interaction) => {
  // Run the code associated with the interaction when it is used
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  await command.execute(interaction);
});

// Music Library Event Catchers
client.player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
});

client.player.on('tracksAdd', (queue, tracks) =>
  queue.metadata.send(
    `🎶 | Playlist with **${tracks.length} tracks** was added to the queue.`
  )
);

client.player.on('botDisconnect', (queue) => {
  queue.metadata.send(
    '❌ | I was manually disconnected from the voice channel, clearing queue!'
  );
});

client.player.on('channelEmpty', (queue) => {
  queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
});

client.player.on('queueEnd', (queue) => {
  queue.metadata.send('✅ | Queue finished!');
});

client.player.on('error', (error) => {
  console.log(error);
});

client.player.on('connectionError', (error) => {
  console.log(error);
});

// Login with the bot token
client.login(token);
