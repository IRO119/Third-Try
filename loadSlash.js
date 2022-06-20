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

client.loadSlashCommands = (bot, reload) => require("./handlers/slashCommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.login(process.env.SECOND_TOKEN)

client.on("ready", async () => {
    const guild = client.guilds.cache.get(guildId)
    if(!guild){
        return console.error("Target guild not found")
    }
    
    await guild.commands.set([...client.slashCommands.values()])
    console.log(`Successfully loaded in ${client.slashCommands.size}`)
    console.log(`Logged in as ${client.user.tag}`)
    process.exit(0)
})