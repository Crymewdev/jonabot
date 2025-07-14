const featureDescriptions = {
  honeypot: {
    title: "🐝 Honeypot Trap Channels",
    usage: [
      ".honeypot enable",
      ".honeypot config honeypot-channel #channel"
    ],
    notes: "Auto-kicks users who speak in a fake 'trap' channel."
  },
  fingerprint: {
    title: "🧬 Raid Fingerprinting",
    usage: [
      ".fingerprint enable",
      ".fingerprint config fingerprint-level 3"
    ],
    notes: "Detects new users based on account age, join patterns, and similarity."
  },
  aispam: {
    title: "🧠 AI Spam Detection",
    usage: [
      ".aispam enable",
      ".aispam config ai-strategy strict"
    ],
    notes: "Flags messages containing spammy phrases like 'free nitro' or scam links."
  },
  dynamiccooldown: {
    title: "📈 Dynamic Cooldowns",
    usage: [
      ".dynamiccooldown enable",
      ".dynamiccooldown config cooldown-threshold 5"
    ],
    notes: "Adjusts flood/spam thresholds live based on traffic volume."
  },
  decoy: {
    title: "🕵️‍♂️ Decoy Mode",
    usage: [
      ".decoy enable",
      ".decoy config decoy-delay 120"
    ],
    notes: "Pretends bot is offline to lure in raiders, then enforces action."
  },
  modreact: {
    title: "🎮 Mod Reaction Triggers",
    usage: [
      ".modreact enable",
      ".modreact config reaction-type 🚨"
    ],
    notes: "Mods can react to messages to auto-delete, warn, or flag them."
  },
  tokenguard: {
    title: "🔐 Anti-Token Spam",
    usage: [
      ".tokenguard enable",
      ".tokenguard config token-keywords add free-nitro"
    ],
    notes: "Blocks messages containing token scams like 'free nitro' or suspicious URLs."
  },
  georaid: {
    title: "🌍 Geo-Aware Join Monitor",
    usage: [
      ".georaid enable",
      ".georaid config geo-region SG"
    ],
    notes: "Monitors mass joins from unfamiliar regions."
  },
  modqueue: {
    title: "📥 Mod Review Queue",
    usage: [
      ".modqueue enable",
      ".modqueue config queue-channel #raid-review"
    ],
    notes: "Suspicious users are added to a review queue before gaining full access."
  }
};

module.exports = {
  name: 'help',
  async execute(ctx, args = []) {
    const send = async (msg) => ctx.channel.send({ embeds: [msg] });

    if (!args.length) {
      const config = require('../config.json');
      let desc = '';
      for (const [feature, data] of Object.entries(featureDescriptions)) {
        const status = config[feature]?.enabled ? '✅' : '❌';
        desc += `${status} **${feature}** – ${data.title}\n`;
      }

      return send({
        title: "🛡️ Jonabot Features Overview",
        description: desc,
        footer: { text: "Try `.help aispam` or `.help honeypot` to learn more about a specific module." },
        color: 0x5865F2
      });
    }

    const key = args[0].toLowerCase();
    const feature = Object.keys(featureDescriptions).find(f => f.toLowerCase() === key);
    if (!feature) {
      return send({
        title: "❌ Unknown Feature",
        description: "That feature doesn't exist. Try `.help` to see all available ones.",
        color: 0xED4245
      });
    }

    const data = featureDescriptions[feature];
    return send({
      title: data.title,
      fields: [
        { name: "📘 Usage", value: data.usage.join("\n") },
        { name: "📝 Notes", value: data.notes }
      ],
      color: 0x57F287
    });
  }
};