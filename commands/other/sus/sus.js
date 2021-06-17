const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'sus',
        memberName: 'sus',
        group: 'fun',
        description: 'Lookin kinda sus',
      });
    }
  
    run(message) {
      var embed = new MessageEmbed()
        .setTitle(`Kinda sus ngl...`)
        .setImage('https://images2.imgbox.com/d3/27/BiAzzqzx_o.png')
        .setFooter(`LyraBot - Made with ❤️ by Lyra Rose`)
        .setColor('#32A8A0');
      return message.say(embed);
    }
  };