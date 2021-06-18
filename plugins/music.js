module.exports = function (pluginApi) {
    client.player = new Player(client, {
        leaveOnEnd: true,
        leaveOnStop: true,
        leaveOnEmpty: true,
        timeout: 0,
        volume: 150,
        quality: 'high',
    });


    client.player.on('error', async (error, message) => {
        const errMessage = ({
            // Thrown when the YouTube search could not find any song with that query.
            SearchIsNull: "No song with that query was found.",

            // Thrown when the provided YouTube Playlist could not be found.
            InvalidPlaylist: "No Playlist was found with that link.",

            // Thrown when the provided Spotify Song could not be found.
            InvalidSpotify: "No Spotify Song was found with that link.",

            // Thrown when the Guild Queue does not exist (no music is playing).
            QueueIsNull: "There is no music playing right now.",

            // Thrown when the Members is not in a VoiceChannel.
            VoiceChannelTypeInvalid: "You need to be in a Voice Channel to play music.",

            // Thrown when the current playing song was an live transmission (that is unsupported).
            LiveUnsupported: "We do not support YouTube Livestreams.",

            // Thrown when the current playing song was unavailable.
            VideoUnavailable: "Something went wrong while playing the current song, skipping...",

            // Thrown when provided argument was Not A Number.
            NotANumber: "The provided argument was Not A Number.",

            // Thrown when the first method argument was not a Discord Message object.
            MessageTypeInvalid: "The Message object was not provided."

        })[error] ?? `**Unknown Error Occurred:** ${error}`

        await message.channel.send(errMessage);
    });
}
