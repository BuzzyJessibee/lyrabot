module.exports = function (question, answer) {
    return BaseEmbed()
        .setTitle(":8ball: | 8ball")
        .setDescription(
            `Q: ${question}
            A: **${answer}**`)
}
