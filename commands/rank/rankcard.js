const commando = require('discord.js-commando');
const Discord = require('discord.js');
const canvacord = require("canvacord");
//const Levels = require("discord-xp");

class TestCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            group: 'rank',
            memberName: 'rank',
            description: 'View your rank card, showing your current XP with LyraBot :heart:'
        });
    }

    async run (message) {
        let target = message.mentions.users.first() || message.author;
        let user = await Levels.fetch(target.id, message.guild.id);
        if (!user) return message.channel.send("Seems like this user has not earned any xp so far.");

        let img = message.author.avatarURL({format: "jpg"});
        const bgimg = "wallpaper2.jpg"

        const rank = new canvacord.Rank()
            .setAvatar(img)
            .setBackground("IMAGE", bgimg)
            .setCurrentXP(user.xp)
            .setRequiredXP(Levels.xpFor(user.level + 1))
            .setStatus("online")
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
            .setLevel(user.level)
            .setRank(1, '1', false);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
            });
    }
}

module.exports = TestCommand;
