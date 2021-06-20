module.exports = function formatCommandString(command, prefix) {
    return `${command.icon ?? ":x:"} - ${prefix}${command.name} | ${command.description}`
}
