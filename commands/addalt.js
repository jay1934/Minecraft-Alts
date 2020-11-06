module.exports = {
  restrict: true,
  async execute(message) {
    const alts = message.client.alts();
    message.delete();
    const embed = (spec) => ({
      color: 3066993,
      title: `Please reply with the alt's ${spec}`,
      footer: 'Please reply within two minutes',
    });
    const next = () =>
      message.channel.awaitMessages(
        (msg) => msg.author.id === '304651719873134592',
        {
          max: 1,
          time: 120000,
          errors: ['time'],
        }
      );
    const msg = await message.channel.send({ embed: embed('username') });
    next()
      .then((collected) => {
        const username = collected.first().content;
        collected.first().delete();
        if (alts.some((alt) => alt.username === username))
          msg.edit(
            `There is already someone in your database named \`${username}\`. Please try again.`
          );
        msg.edit({ embed: embed('password') });
        next()
          .then((_collected) => {
            const password = _collected.first().content;
            _collected.first().delete();
            msg.edit({
              embed: {
                title: `${username} has been added to the list of alts`,
                color: 3066993,
              },
            });
            msg.delete({ timeout: 10000 });
            alts.push({ username, password });
            require('fs').writeFile('./alts.json', JSON.stringify(alts, '', 2));
          })
          .catch(() => msg.edit('You did not respond within two minutes'));
      })
      .catch(() => msg.edit('You did not respond within two minutes'));
  },
};
