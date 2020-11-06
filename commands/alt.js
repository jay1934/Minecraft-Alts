module.exports = {
  execute(message) {
    const alts = message.client.alts();
    if (!alts.length)
      return message.channel.send(
        'Unfortunately there are no alts in stock. Please try again later!'
      );

    message.author
      .send({
        embed: {
          title: `Click on me to recieve your free Minecraft alt!`,
          url: 'https://bit.ly/36bi427',
          color: 3066993,
        },
      })
      .then(() =>
        setTimeout(() => {
          const alt = alts.shift();
          require('fs').writeFileSync(
            './alts.json',
            JSON.stringify(alts, '', 2)
          );
          const fields = [
            { name: 'Username', value: alt.username, inline: true },
            { name: 'Password', value: alt.password, inline: true },
          ];
          message.author.send({
            embed: {
              title: 'Your new alt has been generated!',
              fields,
              color: 3066993,
            },
          });
          message.client.channels.cache
            .get(require('../config.json').logChannelID)
            .send({
              embed: {
                author: {
                  name: message.author.username,
                  iconURL: message.author.displayAvatarURL(),
                },
                title: `${message.author.tag} was given a new alt`,
                fields,
                color: 3066993,
              },
            });
        }, 90000)
      )
      .catch(() => {
        message.channel
          .send(
            'I cannot DM you! This might be because you have blocked me, or because you have not enabled DMs sent from non-friends'
          )
          .then((msg) => msg.delete({ timeout: 6000 }));
      });
  },
};
