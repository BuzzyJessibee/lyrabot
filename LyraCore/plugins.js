const Path = require("path");
const fs = require("fs");

const importableExtensions = new Set(["js"]);

function requireAll(dir) {
    const pathParts = fs.readdirSync(Path.resolve(dir))
                        .map(v => v.split('.'))
                        .filter(v => (v.length === 2 && importableExtensions.has(v[1])) || v.length === 1)

    const names = pathParts.map(p => p[0]);
    const paths = pathParts.map(p => Path.resolve(dir, p.join('.')));

    const modules = {}
    for (const [i, path] of paths.entries()) {
        const name = names[i];
        modules[name] = require(path);
    }

    return modules
}


module.exports = function loadPlugins(pluginApi) {
    const plugins = requireAll("plugins");

    const loaded = {};
    for (const key in plugins) {
        loaded[key] = plugins[key](pluginApi);
    }

    return loaded;
}
