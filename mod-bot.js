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

client.on("interactionCreate", (interaction) => {
    if(!interaction.isCommand())return
    if(!interaction.inGuild()) return interaction.reply("This command can only be used within a server")

    const slashcmnd = client.slashCommands.get(interaction.commandName)

    if(!slashcmnd) return interaction.reply("Invalid slash command")

    if(slashcmnd.perms && !interaction.member.permissions.has(slashcmnd.perm))
        return interaction.reply("You do not have permission for this command")

    slashcmnd.run(client, interaction)
})

client.login(process.env.SECOND_TOKEN)