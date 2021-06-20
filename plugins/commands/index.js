const formatCommandString = require("./formatCommandString");
const {baseEmbed} = LyraCore

function getEmbed(groups) {
    const embed = baseEmbed();
    for (const [group, commandStrings] of Object.entries(groups)) {
        embed.addField(group, commandStrings.join("\n"));
    }

    return embed
}


module.exports = function ({CommandoClient, config}) {
    const commands = CommandoClient.registry.commands;

    const groups = {} //{group: [<formatted command strings>]}

    for (const [_, command] of commands.entries()) {
        const groupName = command.group.name;

        if (config.blockedCommandGroups.includes(groupName))
            continue;

        groups[groupName] ||= [];

        const commandStr = formatCommandString(command, CommandoClient.commandPrefix);
        groups[groupName].push(commandStr);
    }

    return {
        getEmbed: () => getEmbed(groups) // Build a new embed for every use to avoid mutating a master copy
    }
}
