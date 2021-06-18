const Path = require("path");
const {CommandoClient, Command} = require("discord.js-commando");

module.exports = function (config) {
    const client = new CommandoClient({
        commandPrefix: config.prefix,
    });

    client.registry
          .registerDefaultTypes()
          .registerGroups([
              ['music', ':notes: Music Command Group:'],
              ['fun', ':game_die: Fun Command Group:'],
              ['rank', ':medal: XP and Rank Related commands'],
              ['lyrautilities', ':gear: Guild Related Commands:']
          ])
          .registerDefaultGroups()
          .registerDefaultCommands({
              eval: false,
              prefix: false,
              commandState: false,
              ping: false,
              help: false
          });

    //============= LOAD COMMANDS =============//
    const commands = flattenObject(require('require-all')({
        dirname: Path.resolve(config.commandDir),
    }))

    //Load all exports in
    const filteredCommands = Object
        .values(commands)
        .filter((exp) => exp?.prototype instanceof Command)

    client.registry.registerCommands(filteredCommands);

    client.login(config.token);

    return client
}

const flattenObject = (obj) => {
    const flattened = {}

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, flattenObject(obj[key]))
        } else {
            flattened[key] = obj[key]
        }
    })

    return flattened
}
