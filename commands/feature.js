const fs = require('fs');
const config = require('../config.json');

module.exports = {
  name: 'feature',
  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply("You need admin rights to use this.");
    }

    const [action, feature, ...rest] = args;
    if (!['enable', 'disable', 'config'].includes(action)) {
      return message.reply("Usage: .feature enable|disable|config <feature> [option] [value]");
    }

    if (!config[feature]) config[feature] = {};

    if (action === 'enable') {
      config[feature].enabled = true;
    } else if (action === 'disable') {
      config[feature].enabled = false;
    } else if (action === 'config') {
      const [option, ...valueParts] = rest;
      const value = valueParts.join(' ');
      config[feature][option] = value;
    }

    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
    message.reply(`✅ Updated \`${feature}\` configuration.`);
  }
};