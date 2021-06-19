const pingPhrase = require("./phrases.json")
const pingMessage = require("./messages/pingComplete.message");

module.exports = async function (msg) {

	var phrase = pingPhrase[Math.floor(Math.random() * pingPhrase.length)];

	if(!msg.editable) {
		const pingMsg = await msg.say('Pinging...');
		await pingMsg.edit(pingMessage(phrase, pingMsg.createdTimestamp, msg.createdTimestamp));

	} else {
		await msg.edit('Pinging...');
		await msg.edit(pingMessage(phrase, msg.editedTimestamp, msg.editedTimestamp));
	}
	
};
