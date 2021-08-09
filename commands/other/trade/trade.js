const tradeMessage = require("./messages/trade.message");

module.exports = async function (message, { request, reward, times}) {
    let channel = message.client.channels.cache.get('874177449821368360')
    await channel.send(tradeMessage(message, request, reward, times));
};