const commando = require('discord.js-commando');

class LyraPingCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'lyrautilities',
			memberName: 'ping',
			description: 'Checks the bot\'s ping to the Discord server.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
		var phrases = [
			"I'm alive... For now",
			"Thanks for worrying about me!",
			"Did something happen?",
			"This is fun!",
			"Yes? What is it?",
			"Did I break something?"
		]
		var wphrase = phrases[Math.floor(Math.random() * phrases.length)];

		if(!msg.editable) {
			const pingMsg = await msg.say('Pinging...');
			return pingMsg.edit(
				wphrase + ` \n:ping_pong: | Pong! The message round-trip took` + `**` + ` ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.` + `**
			`);
		} else {
			await msg.edit('Pinging...');
			return msg.edit(
			wphrase + ` \n:ping_pong: | Pong! The message round-trip took` + `**` + `${msg.editedTimestamp - msg.createdTimestamp}ms`+ `**
			`);
		}
	}
};
module.exports = LyraPingCommand;
