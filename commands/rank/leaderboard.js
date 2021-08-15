const commando = require('discord.js-commando');
const Discord = require('discord.js');

const { MessageEmbed } = require('discord.js');

class LBCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            group: 'rank',
            memberName: 'leaderboard',
            description: 'Display a list of the top 10 people with the most XP on the server! (WIP, not pretty)'
        });
    }

    async run (message) {
        // let client = message.command.client
        //
        // const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
        //
        // if (rawLeaderboard.length < 1) return reply("Nobody's on the leaderboard yet.");
        //
        // const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
        //
        // const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
        //
        // const lbEmbed = new MessageEmbed()
        //     .setColor('#32A8A0')
        //     .setTitle(`:medal: Leaderboard`)
        //     .setFooter(`LyraBot - Made with ❤️ by Lyra Rose`)
        //     .setDescription("How do you stack up?");
        //     //`**Leaderboard**:\n\n${lb.join("\n\n")}`
        //
        // var i;
        // for (i = 0; i < lb.length; i++) {
        //     lbEmbed.addField(lb[i], "=-=-=-=-=-=-=-=-=-=-=-=-=")
        // }
        // message.channel.send(lbEmbed);
        await message.channel.send(":x: This command is currently disabled!")
    }
}

module.exports = LBCommand;
