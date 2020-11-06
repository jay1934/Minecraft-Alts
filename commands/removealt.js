module.exports = {
  restrict: true,
  execute(message, args) {
    const alts = message.client.alts();
    const username = args.join(' ');
    const index = alts.findIndex((alt) => alt.username === username);
    if (!username)
      return message.channel.send(
        'You need to specify an alt to remove!\nCorrect usage: `+removealt <username of alt>`'
      );
    if (index < 0)
      return message.channel.send(
        `Could not find any alt with the username \`${username}\` in my database. Remember that it's case sensitive!`
      );
    message.channel
      .send({
        embed: {
          color: 3066993,
          title: `Are you sure you want to delete \`${username}\` from the database?`,
          footer: 'Please react within two minutes',
        },
      })
      .then(async (msg) => {
        await msg.react('✅');
        await msg.react('❌');
        msg
          .awaitReactions(
            (reaction, user) =>
              ['✅', '❌'].includes(reaction.emoji.name) &&
              user.id === message.author.id,
            {
              max: 1,
              time: 120000,
              errors: ['time'],
            }
          )
          .then((collected) => {
            if (collected.first().emoji.name === '✅') {
              alts.splice(index, 1);
              require('fs').writeFile(
                './alts.json',
                JSON.stringify(alts, '', 2)
              );
              msg.reactions.removeAll();
              msg.edit({
                embed: {
                  color: 3066993,
                  title: `\`${username}\` has been removed from the database. There are ${alts.length} alts left.`,
                },
              });
            } else {
              msg.reactions.removeAll();
              msg.edit({
                embed: {
                  color: 3066993,
                  title: `The alt has been preserved in the database.`,
                },
              });
            }
          })
          .catch(() => msg.edit('You did not respond within two minutes'));
      });
  },
};
