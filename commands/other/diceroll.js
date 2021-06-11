const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'fun',
            memberName: 'roll',
            description: 'Rolls a dice.',
            args: [
                {
                    key: 'sides',
                    prompt: 'Please enter a number of sides!',
                    type: 'integer',
                    default: 6
                }
            ]
        });
    }

    async run (message, { sides }) {


        var roll = Math.floor(Math.random() * sides) + 1;
        var phrases = [
            '\"Hmm let\"s see now...\"',
            '"Ooh! What\'d you get?"',
            '\"And the magic dice say...\"',
        ]
        var wphrase = phrases[Math.floor(Math.random() * phrases.length)];
        var reply = {
            "embed": {
              "title": ":game_die: | Lyra's Magic Dice!",
              "footer": {
                "text": "LyraBot - Made with ❤️ by Lyra Rose"
              },
              "description": wphrase + "\n\n**You've rolled a " + roll + "!" + "**",
              "color": 3319968
            }
          }
        message.say(reply);
    }
}

module.exports = DiceRollCommand;