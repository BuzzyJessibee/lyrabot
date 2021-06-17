const {baseEmbed} = LyraCore;

module.exports = function (bunnyImageUrl) {
    return baseEmbed()
        .setTitle("Bunnies! :rabbit2:")
        .setImage(bunnyImageUrl)
}
