const { Client } = require('discord.js');
const fs = require('fs');

const client = new Client();
client.commands = new Map();
client.alts = () => JSON.parse(fs.readFileSync('./alts.json', 'utf8'));

fs.readdirSync('./commands').forEach((file) =>
  client.commands.set(file.split('.')[0], require(`./commands/${file}`))
);

client.on('message', require('./message.js'));

client.login(require('./config.json').token);
