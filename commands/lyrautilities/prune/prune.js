const pruneMessage = require("./messages/prune.message");
const pruneErrorMessage = require("./messages/pruneError.message");

module.exports = async function (message, {deleteCount}) {
  try {
    await message.channel.bulkDelete(deleteCount)
    await message.say(pruneMessage(deleteCount))
  }
  catch(e) {
    console.error(e);
    await message.say(pruneErrorMessage());
  }
};