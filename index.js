const fs = require("fs");
const Path = require("path");

//================ PRE-LOAD CHECKS ================//
if (!fs.existsSync("./config.json"))
    throw new Error("Could not find >config.json<! Make sure you've renamed >config.json.example< to >config.json< and filled out its required fields!");

//================ LOAD ================//
(async () => {
    const LC = global.LyraCore = {};

    const config = require("./config.json");

    LC.logger = require("./LyraCore/logging");
    LC.baseEmbed = require("./LyraCore/BaseEmbed");
    LC.buildCommand = require("./LyraCore/buildCommand");

    const Database = await require("./LyraCore/Database")(config);
    const CommandoClient = await require("./LyraCore/CommandoClient")(config);

    const pluginAPI = {
        config,
        Database,
        CommandoClient
    }

    LC.plugins = await require("./LyraCore/plugins")(pluginAPI);

    console.log("=========LOAD COMPLETE===========");
})()






