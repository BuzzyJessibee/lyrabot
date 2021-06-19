const pruneMessage = require("./messages/prune.message");
const pruneErrorMessage = require("./messages/pruneError.message");

module.exports = async function (message, {deleteCount}) {

  message.channel
    .bulkDelete(deleteCount)
    .then(message.say(pruneMessage(deleteCount)))
    .catch(e => {
      console.error(e);
      return message.say(pruneErrorMessage());
    });
};