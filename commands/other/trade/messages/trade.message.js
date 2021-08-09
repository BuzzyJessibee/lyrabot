const {baseEmbed} = LyraCore;

module.exports = function (message, request, reward, times) {
    return baseEmbed()
        .setTitle(`A new request has been posted!`)
        .setDescription(`Name: ${message.author}\nRequest: ${request}\nReward: ${reward}\nNumber available: ${times}`)
}