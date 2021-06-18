This folder contains code that either provides functionality to commands or operates without them. For example, leveling
and the core music player. Top-level exports should be a function that takes a pluginApi object, containing the program
config and database, and returns an API for commands to use through the `LyraCore.plugins.<NAME>` field, where `<NAME>`
is the folder or file name.
