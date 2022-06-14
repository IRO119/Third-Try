const Discord = require("discord.js");

require("dotenv").config();

const client = new Discord.Client({
    intents: ["GUILDS"]
})

let bot = {
    client 
}



const guildId = "978465393175830568"

client.slashCommands = new Discord.Collection()

client.loadSlashCommants = (bot, reload) => require("./handlers/slashCommands")
client.loadSlashCommants(bot, false)

client.login(process.env.SECOND_TOKEN)

client.on("ready", () => {
    const guild = client.guilds.cache.get(guildId)
    if(!guild){
        return console.error("Target guild not found")
    }
    
    console.log(`Logged in as ${client.user.tag}`)
})