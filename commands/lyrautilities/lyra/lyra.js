const lyraMessage = require("./messages/lyra.message")

module.exports = async function run(message) {
    const {plugins} = LyraCore;

    console.log(LyraCore, plugins);
    await message.say(lyraMessage(plugins.commands.getEmbed()));
}


