const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
//remember clientID is the Bot's ID

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const { Player } = require('discord-music-player');

const player = new Player(client, { deafenOnJoin: true });

client.player = player;

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
  client.user.setActivity('music to pass time', { type: 'LISTENING' });
  setInterval(() => {
    client.user.setActivity('music to pass time', { type: 'LISTENING' });
  }, 10000);
  console.log(`${client.user.tag} is Ready!`);
  const Guilds = client.guilds.cache.map((guild) => guild.name);
  console.log(Guilds, 'Connected!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  await command.execute(interaction);
});

client.player.on('songAdd', (queue, song) => {
  queue.data.queueInitMessage.channel.send(`🎶 | Track **${song}** queued!`);
});

client.player.on('playlistAdd', (queue, playlist) =>
  queue.data.queueInitMessage.channel.send(
    `🎶 | Playlist **${playlist}** with **${playlist.songs.length} tracks** was added to the queue.`
  )
);

client.player.on('clientDisconnect', (queue) => {
  queue.data.queueInitMessage.channel.send(
    '❌ | I was manually disconnected from the voice channel, clearing queue!'
  );
});

client.player.on('channelEmpty', (queue) => {
  queue.data.queueInitMessage.channel.send(
    '❌ | Nobody is in the voice channel, leaving...'
  );
});

client.player.on('queueEnd', (queue) => {
  queue.data.queueInitMessage.channel.send('✅ | Queue finished!');
});

client.login(token);
