<div align="center">

![](/banner.png)

[Installation](#Installation) • [How to Use](#How-to-Use)

---

## Installation

</div>

##### Prerequisite

- To use this bot, Node.js 12.0.0 or newer must be [installed](https://nodejs.org/en/download/).

##### Downloading and installing steps

1.  **[Download](https://github.com/jay1934/Minecraft-Alts/archive/main.zip)** the `zip` file.

2.  Configure the Bot:

    - Run `npm i`
    - You will need to [create a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) in the **[developers space](https://discordapp.com/developers/applications/me)**
    - Replace the placeholders in [`config.json`](/config.json) with your preffered settings.

3.  Invite the Bot to your Server:

    - In your bot's application page, navigate to [OAUTH2](https://discord.com/developers/applications/771430839250059274/oauth2)
    - In the "scopes" section, select `bot`
    - In the "bot permission" section, select:

      - `ADMINISTRATOR`

      This will account for permissions needed on all three features.

    - Copy and paste the generated invite link!

4.  Get the Bot Online
    - Run `node index.js`
    - **The bot is now operational ! 🎉**

<br>

---

<div align="center">

## How to Use

</div>

This bot starts with an empty [`alts.json`](/alts.json) file that will be populated with all alts submitted via the [`+addalt`](/commands/addalt.js) command. Thanks to the nature of `fs`, a built in node.js module, new alt data is physically written to the JSON file. This means that your data will be preserved, even if you restart your bot.

All users can use the [`+alt`](/commands/alt.js) command (once every thirty minutes), which will send them an embedded link to your page. After a minute and thirty second has passed, one alt will be removed from the JSON list and sent to the user. This will also be logged to the channel specified in [`config.json`](/config.json)
