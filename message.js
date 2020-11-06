const cooldowns = new Set();

module.exports = (message) => {
  if (
    message.author.bot ||
    !message.content.startsWith('+') ||
    !message.content
  )
    return;
  const args = message.content.slice(1).split(/ +/);
  const command = message.client.commands.get(args.shift().toLowerCase());

  if (!command) return;
  if (command.restrict) {
    if (message.author.id !== '304651719873134592')
      return message.channel
        .send("You can't use this command!")
        .then((msg) => msg.delete({ timeout: 4000 }));
  } else {
    if (cooldowns.has(message.author.id))
      return message.channel.send(
        'Your usage of this command is still on cooldown!'
      );
    cooldowns.add(message.author.id);
    setTimeout(() => cooldowns.delete(message.author.id), 1.8e6);
  }

  try {
    command.execute(message, args);
  } catch (err) {
    console.error(err);
  }
};
