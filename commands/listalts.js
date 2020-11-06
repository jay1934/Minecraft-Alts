module.exports = {
  restrict: true,
  execute(message) {
    const alts = message.client.alts();
    const array = alts.reduce(
      (acc, { username }) =>
        [...acc, username].map((alt, idx) => `${idx}. \`${alt}\``).join('\n')
          .length > 2048
          ? [...acc, alts.length - acc.length]
          : [...acc, username],
      []
    );
    message.channel.send({
      embed: {
        footer: {
          text: Number.isInteger(array[array.length - 1])
            ? `And ${array.pop()} more...`
            : `You can add or remove alts with \`+addalt\` and \`+removealt\``,
        },
        title: `You have ${alts.length} alts stored in your database`,
        description: array
          .map((alt, idx) => `${idx + 1}. \`${alt}\``)
          .join('\n'),
        color: 3066993,
      },
    });
  },
};
