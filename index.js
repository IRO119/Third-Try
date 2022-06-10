
const Discord = require("Discord.js");

require("dotenv").config();

const generateImage = require("./image")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on("messageCreate", (Message) => {
    if(Message.content == "hi"){
        Message.reply("Hello world!");
    }

    var orgMessage = Message.content
    var m = Message.content.toLowerCase()

    if(m.length >= 2 && m.substr(-2) == "er"){
        orgMessage = orgMessage.substr(0, orgMessage.length - 2)
        Message.reply(`Woooaaah buddy. No hard r's. Don't you mean: ${orgMessage}a`) 
    }
}); 


const welcomeChannelId = "978465393175830568"


client.on("guildMemberAdd", async (member) =>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
        
});


client.login(process.env.TOKEN);