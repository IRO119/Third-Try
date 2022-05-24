const Discord = require("Discord.js");

require("dotenv".config());

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on("messageCreate", (Message) => {
    if(Message.content == "hi"){
        Message.reply("Hello world!");
    }
});

client.login(process.env.TOKEN);