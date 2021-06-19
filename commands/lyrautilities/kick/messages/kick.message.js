const {baseEmbed} = LyraCore;

module.exports = function (userToKick, reason) {
    return baseEmbed()
        .addField('Kicked:', userToKick)
        .addField('Reason', reason)
        .setImage('https://media1.tenor.com/images/74b79a7dc96b93b0e47adab94adcf25c/tenor.gif')
}