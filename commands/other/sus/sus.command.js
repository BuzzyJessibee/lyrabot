const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./sus"),
    name: 'sus',
    memberName: 'sus',
    group: 'fun',
    description: 'Lookin kinda sus'
});