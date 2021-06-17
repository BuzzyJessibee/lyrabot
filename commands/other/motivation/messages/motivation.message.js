const {baseEmbed} = LyraCore;

module.exports = function (randomQuote) {
    return baseEmbed()
        .setAuthor(
            'Motivational Quote',
            'https://i.imgur.com/Cnr6cQb.png',
            'https://type.fit'
        )
        .setDescription(`*"${randomQuote.text}*"\n\n-${randomQuote.author}`)
        .setTimestamp()
        .setFooter('LyraBot - Made with ❤️ by Lyra Rose • Powered by type.fit')
}