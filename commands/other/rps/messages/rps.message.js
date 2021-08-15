const {baseEmbed} = LyraCore;

module.exports = function (reply, isWin) {
    return baseEmbed()
    .setTitle('Rock, Paper, Scissors')
    .setDescription(`**${reply}**\n\n**${isWin}**`)
}