const Discord = require("discord.js");

require("dotenv").config();

const client = new Discord.Client({
    intents: ["GUILDS"]
})

let bot = {
    client 
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})


client.slashCommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashCommands")(bot, reload)
client.loadSlashCommands(bot, false)



client.login(process.env.SECOND_TOKEN)