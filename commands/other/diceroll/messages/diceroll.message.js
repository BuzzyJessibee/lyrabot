const {baseEmbed} = LyraCore

module.exports = function (description) {
    return baseEmbed()
        .setTitle(":game_die: | Dice Roll!")
        .setDescription(description)
}