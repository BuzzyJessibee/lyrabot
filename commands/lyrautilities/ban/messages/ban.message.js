const {baseEmbed} = LyraCore;

module.exports = function (userToBan, reason) {
    return baseEmbed()
        .addField('Banned:', userToBan)
        .addField('Reason', reason)
        .setImage('https://media1.tenor.com/images/6a61251f5453d93d76f9826be10b7f49/tenor.gif')
}
