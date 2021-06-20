const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./bunny"),
    icon: ":rabbit2:",
    name: 'bunny',
    group: 'fun',
    memberName: 'bunny',
    description: 'Get a picture of a rabbit!'
});
