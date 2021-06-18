const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = function (filePath = "db.json") {
    const adapter = new FileSync(filePath);
    const l = low(adapter);
    l.read();
    return l;
}
