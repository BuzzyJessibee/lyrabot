const low = require("lowdb");
const userModel = require("./models/user.model");


let db;
const k = "discordXp";

class DiscordXp {

    /**
     * @param {low} [low] - A lowDB instance.
     */

    static async setDb(low) {
        if (!low) throw new TypeError("A lowDb instance was not provided");
        db = low;
        db.defaults({discordXp: {}}).write()
    }


    /**
     * @param {string} [userId] - Discord user id.
     */
    static async createUser(userId) {
        if (!userId) throw new TypeError("An user id was not provided.");

        const isUser = await db.get(k).has(userId).value();

        if (isUser)
            return;

        return db.get(k).set(userId, userModel()).write();
    }

    /**
     * @param {string} [userId] - Discord user id.
     * @param {string} [guildId] - Discord guild id.
     */

    static async deleteUser(userId, guildId) {
        if (!userId) throw new TypeError("An user id was not provided.");

        if (guildId)
            return db.get([k, userId, "guildXp"]).unset(guildId).write()
        else
            return db.get(k).unset(userId).write()
    }


    static async appendUserXp(userId, xp) {
        if (!userId) throw new TypeError("An user id was not provided.");
        if (xp === 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("An amount of xp was not provided/was invalid.");

        await DiscordXp.createUser(userId);
        const currentTotalXp = await DiscordXp.getUserXp(userId);

        if (currentTotalXp == null)
            return;

        await DiscordXp.setUserXp(userId, currentTotalXp + xp);

        const currentLevel = DiscordXp.levelFor(currentTotalXp);
        const nextLevel = DiscordXp.levelFor(currentTotalXp + xp);

        return nextLevel !== currentLevel && nextLevel;
    }

    static async appendUserGuildXp(userId, guildId, xp) {
        if (!userId) throw new TypeError("An user id was not provided.");
        if (!guildId) return false; //undefined guild falls through to here.
        if (xp === 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("An amount of xp was not provided/was invalid.");

        await DiscordXp.createUser(userId);
        const currentGuildXp = await DiscordXp.getUserGuildXp(userId, guildId) || 0;

        const currentLevel = DiscordXp.levelFor(currentGuildXp);
        const nextLevel = DiscordXp.levelFor(currentGuildXp + xp)

        await DiscordXp.setUserGuildXp(userId, guildId, currentGuildXp + xp);

        return nextLevel !== currentLevel && nextLevel;
    }

    /**
     * Appends XP to both a user's personal and guild XP totals.
     * @param userId {string}
     * @param guildId {string}
     * @param xp {number}
     * @return {Promise<{guildLevel: (*|undefined), userLevel: (*|undefined)}|boolean>} The level-up result. Is either false or an object containing new guild or user level(s)
     */
    static async appendXp(userId, guildId, xp) {
        if (!userId) throw new TypeError("An user id was not provided.");

        const userLeveled = await DiscordXp.appendUserXp(userId, xp);
        const guildLeveled = await DiscordXp.appendUserGuildXp(userId, guildId, xp);

        if (userLeveled || guildLeveled)
            return {
                userLevel: userLeveled || undefined,
                guildLevel: guildLeveled || undefined
            }
        else
            return false
    }

    /**
     * @param {string} [userId] - Discord user id.
     * @param {string} [guildId] - Discord guild id.
     * @param {number} [levels] - Amount of levels to append.
     */

    static async appendLevel(userId, guildId, levels) {
        throw new Error("UNIMPLEMENTED");
    }

    static async setUserXp(userId, xp) {
        return db.get([k, userId]).set("totalXp", xp).write();
    }

    static async setUserGuildXp(userId, guildId, xp) {
        return db.get([k, userId, "guildXp"]).set(guildId, xp).write();
    }

    static async getUserXp(userId) {
        return db.get([k, userId, "totalXp"]).value();
    }

    static async getUserGuildXp(userId, guildId) {
        return db.get([k, userId, "guildXp", guildId]).value();
    }

    /**
     * @param {string} [userId] - Discord user id.
     * @param {string} [guildId] - Discord guild id.
     * @param {number} [level] - A level to set.
     */

    static async setLevel(userId, guildId, level) {
        throw new Error("UNIMPLEMENTED");
    }

    /**
     * @param {string} [userId] - Discord user id.
     * @param {string} [guildId] - Discord guild id.
     * @param {number} [xp] - Amount of xp to subtract.
     */

    static async subtractXp(userId, guildId, xp) {
        throw new Error("UNIMPLEMENTED");
    }

    /**
     * @param {string} [userId] - Discord user id.
     * @param {string} [guildId] - Discord guild id.
     * @param {number} [levels] - Amount of levels to subtract.
     */

    static async subtractLevel(userId, guildId, levelss) {
        throw new Error("UNIMPLEMENTED");
    }

    /**
     * @param {string} [guildId] - Discord guild id.
     * @param {number} [limit] - Amount of maximum enteries to return.
     */


    static async fetchLeaderboard(guildId, limit) {
        throw new Error("UNIMPLEMENTED");
    }

    /**
     * @param {string} [client] - Your Discord.CLient.
     * @param {array} [leaderboard] - The output from 'fetchLeaderboard' function.
     */

    static async computeLeaderboard(client, leaderboard, fetchUsers = false) {
        throw new Error("UNIMPLEMENTED");
    }

    /**
     * Computes the amount of xp needed for a given level
     * @param targetLevel
     * @return {number} The amount of XP needed for the target level
     */
    static xpFor(targetLevel) {
        if (isNaN(targetLevel) || isNaN(parseInt(targetLevel, 10))) throw new TypeError("Target level should be a valid number.");
        if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10);
        if (targetLevel < 0) throw new RangeError("Target level should be a positive number.");

        return targetLevel ** 2 * 100;
    }

    /**
     * Computes the level for a given amount of xp
     * @param xp
     * @return {number} The
     */
    static levelFor(xp) {
        if (isNaN(xp) || isNaN(parseInt(xp, 10))) throw new TypeError("Target level should be a valid number.");
        if (isNaN(xp)) xp = parseInt(xp, 10);
        if (xp < 0) throw new RangeError("Target level should be a positive number.");

        return Math.floor((xp / 100) ** 0.5);
    }

    /**
     * @param {string} [guildId] - Discord guild id.
     */
    static async deleteGuild(guildId) {
        throw new Error("UNIMPLEMENTED");
    }

    static async getUserLevel(userId) {
        return DiscordXp.levelFor(await DiscordXp.getUserXp(userId));
    }

    static async getUserGuildLevel(userId, guildId) {
        return DiscordXp.levelFor(DiscordXp.getUserGuildLevel(userId, guildId));
    }
}

module.exports = DiscordXp;
