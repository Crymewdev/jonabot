module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;
    const config = require('../config.json');
    const prefix = process.env.PREFIX || '.';

    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const cmd = args.shift().toLowerCase();
      const command = client.commands.get(cmd);
      if (command) command.execute(message, args);
    }

    if (config.honeypot?.enabled && message.channel.id === config.honeypot.channelId) {
      await message.delete();
      await message.member.kick("Triggered honeypot");
    }

    if (config.aiSpam?.enabled) {
      const scamWords = ['free nitro', 'airdrop', 'steam gift', 'token'];
      if (scamWords.some(w => message.content.toLowerCase().includes(w))) {
        await message.delete();
        message.channel.send(`🚨 Spam blocked from ${message.author}`);
      }
    }
  }
};