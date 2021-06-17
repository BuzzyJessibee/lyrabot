const {baseEmbed} = LyraCore;

module.exports = function (text) {
    return baseEmbed()
    .setTitle(`Just wanted to say...`)
    .setDescription(text)
}