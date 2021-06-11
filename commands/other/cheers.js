const commando = require('discord.js-commando');

class CheersCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cheers',
            group: 'fun',
            memberName: 'cheers',
            description: 'Feeling Cheery?'
        });
    }

    async run (message) {
        var image = {
            "embed": {
            "title": "Cheers! :tea:",
            "color": 3319968,
            "footer": {
                "text": "LyraBot - Made with ❤️ by Lyra Rose"
              },
            "image": {
              "url": "https://i.gifer.com/m9V.gif"
            }
          }
        }
        message.say(image);
    }
}

module.exports = CheersCommand;