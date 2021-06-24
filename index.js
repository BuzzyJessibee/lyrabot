const fs = require("fs");
const Path = require("path");

//================ LOAD ================//
(async () => {
    const LC = global.LyraCore = {};
    LC.logger = require("./LyraCore/logging");

    const config = require("./LyraCore/readConfig")("./");

    LC.config = config;
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






