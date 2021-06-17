const {baseEmbed} = LyraCore;

module.exports = function (question, answer) {
    return baseEmbed()
        .setTitle(":8ball: | 8ball")
        .setDescription(
            `Q: ${question}
            A: **${answer}**`)
}
