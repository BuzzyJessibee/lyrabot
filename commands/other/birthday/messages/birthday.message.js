const {baseEmbed} = LyraCore;

module.exports = function (user) {
    return baseEmbed()
        .setTitle(":tada: | Lyra's Birthday Wishes!")
        .setDescription(
            `Happy Birthday ${user}!
            I hope you have a fantastic day, and that your year is full of magic!`)
        .setThumbnail("http://www.emoji.co.uk/files/emoji-one/food-drink-emoji-one/1646-birthday-cake.png")
}

