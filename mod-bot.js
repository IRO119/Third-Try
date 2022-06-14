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

client.loadSlashCommants = (bot, reload) => require("./handlers/slashCommands")
client.loadSlashCommants(bot, false)

client.login(process.env.SECOND_TOKEN)