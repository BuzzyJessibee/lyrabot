const StormDB = require('stormdb');

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine('./db.stormdb');
const db = new StormDB(engine);

// set default db value if db is empty
db.default({ users: [], servers: [] });

// Server Functions
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function addGuildInDB(guildId) {
  let servers = db.get('servers').value();
  let server = servers.find((x) => x.id === guildId);

  if (!server) {
    console.log('Server not found, adding it really quick...');
    db.get('servers').push({ id: guildId, alertType: 'normal' });
    db.save();
    console.log('Added guild:', guildId);
  }
}

function updateAlertType(guildId, alertType) {
  let servers = db.get('servers').value();
  let serverIndex = servers.findIndex((x) => x.id === guildId);

  console.log(serverIndex);
  if (serverIndex != -1 && serverIndex) {
    db.get('servers').get(serverIndex).get('alertType').set(alertType);
    db.save();
    console.log('alertType updated to', alertType);
    //console.log(db.get('servers').get(serverIndex).get('alertType').value());
  } else {
    addGuildInDB(guildId);
    updateAlertType(guildId, alertType);
    return;
  }
}

// User Functions
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function guildAttachedToUser(authorId, guildId) {
  let users = db.get('users').value();
  let currentUserIndex = users.findIndex((x) => x.id === authorId);

  let guildList = db.get('users').get(currentUserIndex).get('guilds').value();
  let currentGuildIndex = guildList.findIndex((x) => x.id === guildId);

  if (currentGuildIndex == -1) {
    return false;
  } else {
    return true;
  }
}

function isUserInDB(authorId) {
  let users = db.get('users').value();
  let currentUserIndex = users.findIndex((x) => x.id === authorId);
  if (currentUserIndex == -1) {
    return false;
  } else {
    return true;
  }
}

function addUserInDB(authorId, message) {
  // catch for interactions
  let username = '';
  if (message.author == undefined) {
    username = message.user.username;
  } else {
    username = message.author.username;
  }

  let users = db.get('users').value();
  let currentUserIndex = users.findIndex((x) => x.id === authorId);
  if (currentUserIndex == -1) {
    db.get('users').push({
      id: authorId,
      guilds: [],
    });
    db.save();
    console.log(
      'User with id',
      authorId,
      'and name',
      username,
      'has been added to the database!'
    );
  } else {
    console.log('ERROR: User is already in DB!');
  }
}

function addGuildToUser(authorId, guildId, message) {
  // catch for interactions
  let username = '';
  if (message.author == undefined) {
    username = message.user.username;
  } else {
    username = message.author.username;
  }

  if (guildAttachedToUser(authorId, guildId)) {
    console.log('User', authorId, 'is already associated with guild', guildId);
  } else {
    let users = db.get('users').value();
    let currentUserIndex = users.findIndex((x) => x.id === authorId);

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;

    db.get('users')
      .get(currentUserIndex)
      .get('guilds')
      .push({ id: guildId, name: message.guild.name, xp: randomAmountOfXp });
    db.save();
    /*     console.log(
      'XP for user',
      authorId,
      'in guild',
      guildId,
      'is now',
      randomAmountOfXp
    ); */
    console.log('User', username, 'associated with guild successfully.');
  }
}

function giveMessageXP(message) {
  if (!message.guild) return; // DM
  if (message.author.bot) return; // If it's a bot user

  let guildId = message.guild.id;
  let authorId = message.author.id;

  if (isUserInDB(authorId)) {
    if (guildAttachedToUser(authorId, guildId)) {
      let users = db.get('users').value();
      let currentUserIndex = users.findIndex((x) => x.id === authorId);

      let guildList = db
        .get('users')
        .get(currentUserIndex)
        .get('guilds')
        .value();
      let currentGuildIndex = guildList.findIndex((x) => x.id === guildId);

      let currentXp = db
        .get('users')
        .get(currentUserIndex)
        .get('guilds')
        .get(currentGuildIndex)
        .get('xp')
        .value();
      const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;

      let newXP = currentXp + randomAmountOfXp;

      db.get('users')
        .get(currentUserIndex)
        .get('guilds')
        .get(currentGuildIndex)
        .get('xp')
        .set(newXP);
      db.save();
      /*       console.log(
        'XP for user',
        authorId,
        'in guild',
        guildId,
        'is now',
        newXP
      ); */
    } else {
      addGuildToUser(authorId, guildId, message);
      return;
    }
  } else {
    addUserInDB(authorId, message);
    giveMessageXP(message);
    return;
  }
}

function calculateTotalPersonalXP(authorId) {
  //if (!message.guild) return; // DM
  //if (message.author.bot) return; // If it's a bot user

  //let guildId = message.guild.id
  //let authorId = message.author.id

  if (isUserInDB(authorId)) {
    let users = db.get('users').value();
    let currentUserIndex = users.findIndex((x) => x.id === authorId);

    let guildList = db.get('users').get(currentUserIndex).get('guilds').value();

    let totalXP = 0;

    for (let i = 0; i < guildList.length; i++) {
      let guild = guildList[i];
      totalXP = totalXP + guild.xp;
    }
    console.log(totalXP);
    return totalXP;
  } else {
    console.log('user not in db - prob try again');
    return false;
  }
}

function retrieveUserGuildXP(interaction) {
  let guildId = interaction.guild.id;
  let authorId = interaction.user.id;

  if (isUserInDB(authorId)) {
    if (guildAttachedToUser(authorId, guildId)) {
      let users = db.get('users').value();
      let currentUserIndex = users.findIndex((x) => x.id === authorId);

      let guildList = db
        .get('users')
        .get(currentUserIndex)
        .get('guilds')
        .value();
      let currentGuildIndex = guildList.findIndex((x) => x.id === guildId);

      let currentXp = db
        .get('users')
        .get(currentUserIndex)
        .get('guilds')
        .get(currentGuildIndex)
        .get('xp')
        .value();

      return currentXp;
    } else {
      addGuildToUser(authorId, guildId, interaction);
      return;
    }
  } else {
    addUserInDB(authorId, interaction);
    retrieveUserGuildXP(interaction);
    return;
  }
}

module.exports = {
  updateAlertType,
  giveMessageXP,
  calculateTotalPersonalXP,
  retrieveUserGuildXP,
};
