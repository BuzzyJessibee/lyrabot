const baseEmbed = require('../baseEmbed');
const ffxivDataCenters = require('./json/ffxivservers.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const request = require('request');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ffxivstatus')
    .setDescription("Get the status of a FFXIV Data Center's servers!")
    .addStringOption((option) =>
      option
        .setName('datacenter')
        .setDescription('FFXIV Data Centers')
        .setRequired(true)
        .addChoice('Aether', 'Aether')
        .addChoice('Crystal', 'Crystal')
        .addChoice('Primal', 'Primal')
        .addChoice('Chaos', 'Chaos')
        .addChoice('Light', 'Light')
        .addChoice('Elemental', 'Elemental')
        .addChoice('Gaia', 'Gaia')
        .addChoice('Mana', 'Mana')
        .addChoice('Materia', 'Materia')
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const DataCenter = interaction.options.get('datacenter').value;

    // Get the current server status
    let currentServerStatusRaw = await doRequest(
      'https://ffxiv-alert-api.herokuapp.com/ffxiv-server-status'
    );

    let serverStatusJSON = JSON.parse(currentServerStatusRaw);

    let DCservers = ffxivDataCenters[DataCenter];

    let embed = baseEmbed()
      .setTitle(`**Server Status for ${DataCenter}**`)
      .setDescription(
        'A green icon means character creation is available whereas a red one means character creation is closed.'
      );

    for (let index = 0; index < DCservers.length; index++) {
      let currentServer = DCservers[index];
      let status = serverStatusJSON[DCservers[index]];
      let onlineStatus = status[2] ? 'Online' : 'Offline';
      let creationStatus = status[1]
        ? '<:charon:931360767024980068>'
        : '<:charoff:931360799870574664>';

      embed.addField(
        `${currentServer}`,
        `${onlineStatus} | ${status[0]} | ${creationStatus}`,
        true
      );
    }

    interaction.followUp({ embeds: [embed] });

    function doRequest(url) {
      return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
          if (!error && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(error);
          }
        });
      });
    }
  },
};
