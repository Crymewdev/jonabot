module.exports = {
  name: 'guildMemberAdd',
  async execute(member, client) {
    const config = require('../config.json');

    if (config.fingerprint?.enabled) {
      const age = (Date.now() - member.user.createdTimestamp) / 60000;
      if (age < 10) {
        const logChannel = member.guild.channels.cache.find(c => c.name === "raid-logs");
        if (logChannel) {
          logChannel.send(`⚠️ New user ${member.user.tag} might be a raider (account ${age.toFixed(1)} mins old)`);
        }
      }
    }
  }
};