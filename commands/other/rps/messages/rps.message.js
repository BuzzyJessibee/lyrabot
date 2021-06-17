const {baseEmbed} = LyraCore;

module.exports = function (reply) {
    return baseEmbed()
    .setTitle('Rock, Paper, Scissors')
    .setDescription(`**${reply}**`)
}