module.exports = {
  name: 'help',
  async execute(ctx) {
    const config = require('../config.json');
    const features = {
      honeypot: "Honeypot trap channel detection",
      fingerprint: "Raid fingerprinting based on user patterns",
      aiSpam: "Smart spam & scam link detection",
      dynamicCooldown: "Adjusts spam thresholds live based on traffic",
      decoy: "Pretend bot is offline, then punish raiders",
      modReact: "React with emoji to trigger mod actions",
      tokenGuard: "Scam keyword detection & auto-deletion",
      geoRaid: "Detects users from strange regions joining rapidly",
      modQueue: "Queues flagged users for mod review"
    };

    let desc = '';
    for (const [feature, description] of Object.entries(features)) {
      const status = config[feature]?.enabled ? '✅' : '❌';
      desc += `${status} **${feature}** – ${description}\n`;
    }

    const embed = {
      title: "🛡️ Jonabot Anti-Raid Features",
      description: desc,
      color: 0x5865F2
    };

    if (ctx.commandName) {
      await ctx.reply({ embeds: [embed] });
    } else {
      await ctx.channel.send({ embeds: [embed] });
    }
  }
};