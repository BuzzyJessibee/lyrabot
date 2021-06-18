const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const log = LyraCore.logger("Database");

module.exports = function (config) {
    log("Connecting to DB")
    const adapter = new FileSync(config.databasePath);
    const l = low(adapter);
    l.read();
    return l;
}
