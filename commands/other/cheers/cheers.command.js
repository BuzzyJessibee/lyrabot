const {buildCommand} = LyraCore

module.exports = buildCommand({
    run: require("./cheers"),
    icon: ":tea:",
    name: 'cheers',
    group: 'fun',
    memberName: 'cheers',
    description: 'Feeling Cheery?'
});
