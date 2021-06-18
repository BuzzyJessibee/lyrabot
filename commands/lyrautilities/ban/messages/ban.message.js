const {baseEmbed} = LyraCore;

module.exports = function (userToBan, reason) {
    return baseEmbed()
        .addField('Banned:', userToBan)
        .addField('Reason', reason)
        .setImage('https://tenor.com/view/when-your-team-too-good-ban-salt-bae-gif-7580925')
}
