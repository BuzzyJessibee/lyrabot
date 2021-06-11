const commando = require('discord.js-commando');

class BirthdayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'birthday',
            group: 'fun',
            memberName: 'birthday',
            description: 'Wish someone a Happy Birthday!',
            args: [{
                key: 'birthday',
                prompt: "User tag of the person that you want the birthday wishes to go to!",
                type: 'user',
                default: ""
            }]

        });
    }

    async run (message, { birthday }) {
        if (birthday !== "") {
            var reply = {
                "embed": {
                  "title": ":tada: | Lyra's Birthday Wishes!",
                  "footer": {
                    "text": "LyraBot - Made with ❤️ by Lyra Rose"
                  },
                  "thumbnail": {
                    "url": "http://www.emoji.co.uk/files/emoji-one/food-drink-emoji-one/1646-birthday-cake.png"},
                  "description": "Happy Birthday <@" + birthday + ">!" + "\nI hope you have a fantastic day, and that your year is full of magic!",
                  "color": 3319968
                }
              }
        } else { 
            var reply = {
                "embed": {
                  "title": ":tada: | Lyra's Birthday Wishes!",
                  "footer": {
                    "text": "LyraBot - Made with ❤️ by Lyra Rose"
                  },
                  "thumbnail": {
                    "url": "http://www.emoji.co.uk/files/emoji-one/food-drink-emoji-one/1646-birthday-cake.png"},
                  "description": "Happy Birthday <@" + message.author + ">!" + "\nI hope you have a fantastic day, and that your year is full of magic!",
                  "color": 16711813
                }
              }
        }
        message.say(reply);
    }
}

module.exports = BirthdayCommand;