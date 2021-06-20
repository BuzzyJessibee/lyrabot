const {buildCommand, plugins} = LyraCore;

module.exports = buildCommand({
    run: require("./lyra"),
    name: 'ra',
    group: 'lyrautilities',
    memberName: 'ra',
    description: 'A help command',
    icon: ":sparkles:"
});
