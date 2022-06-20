const fs = require("fs")

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}

module.exports = (bot, reload) => {
    const {client} = bot

    let slashCommands = getFiles("./slashCommands/", ".js")

    if(slashCommands.length === 0){
        console.log("No such slash commands loaded")
    }

    slashCommands.forEach(f => {
        if (reload) delete require.cache[require.resolve(`../slashCommands/${f}`)]
        
        const slashCmnd = require(`../slashCommands/${f}`)
        client.slashCommands.set(slashCmnd.name, slashCmnd)
        
    })
}