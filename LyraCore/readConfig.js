const {existsSync: es, writeFileSync} = require("fs");
const {resolve: r} = require("path");
const log = LyraCore.logger("Config");
/**
 * Reads and verifies
 */
module.exports = function (configDir, configName = "config.json", baseConfigName = "config.example.json") {
    const cfgPath = r(configDir, configName);
    const baseCfgPath = r(configDir, baseConfigName);

    //Verify existence of both files
    if (!es(baseCfgPath))
        throw new Error(`Base config file >${baseCfgPath}< does not exist! This should never happen!`);

    if (!es(cfgPath))
        log(`Config file >${cfgPath}< did not exist! A new config file will be created!`);


    const baseCfg = require(baseCfgPath);
    const cfg = es(cfgPath) ? require(cfgPath) : {};

    //Merge the base config into the user config
    for (let k of Object.keys(baseCfg)) {
        if (!(k in cfg)) {
            log(`Config property >${k}< was not present in config. Defaulting to >${baseCfg[k]}<`);
            cfg[k] = baseCfg[k]
        }
    }

    writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));

    log("Config loaded");

    return cfg;
}
