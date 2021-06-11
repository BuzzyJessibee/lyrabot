const commando = require('discord.js-commando');

class BallCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            group: 'fun',
            memberName: '8ball',
            description: 'Lyra will answer all your questions!',
            examples: ['ly!8ball Will I be rich and famous?'],
            args: [{
                key: 'question',
                prompt: "Don't forget your question!",
                type: 'string'
            }]
        });
    }  

    async run (message, {question}) {
        let choices = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes - definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no",
            "Outlook not so good.",
            "Very doubtful."
        ];
        let answer = choices[Math.floor(Math.random() * choices.length)];
        let result = {
            "embed": {
                "title": ":8ball: | 8ball",
                "footer": {
                    "text": "LyraBot - Made with ❤️ by Lyra Rose"
                  },
                "description": "Q: " + question + "\nA: " + "**" + answer + "**",
                "color": 3319968,
            }
        }

        return message.say(result);
    }
}

module.exports = BallCommand;