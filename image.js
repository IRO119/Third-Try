console.log("Starting image.js");

const Canvas = require("canvas");

const Discord = require("discord.js")

const background = "https://i.imgur.com/4VzysQ2.jpeg"

const dim = {
    height: 387,
    width: 500,
    margin: 50
}

const av = {
    size: 256,
    x: 125,
    y: 50
}

const generateImage = async (member) =>{
    
    let username = member.user.username;
    let discrim = member.user.discriminator;
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size});

    console.log("Created all the variatbles for generate image")
    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    console.log("Created the canvas and got the contex")
    
    //draws the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    console.log("Created the background")

    //draws black tinted box
    ctx.fillStyle = "rgba(0, 0, 0, 0, 0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.margin - 2 * dim.margin, dim.height - 2 * dim.margin)

    console.log("Created the black tindted box")

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    console.log("Saved the context")

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    console.log("Drew the circle ")

    ctx.drawImage(avimg, av.x, av.y)

    console.log("Drew the image")

    ctx.restore()

    console.log("restored the contex")
    
    ctx.fillStyle = "black"
    ctx.textAlign = "center"

    //welcome message

    ctx.font = "50px Times New Roman"
    ctx.fillText("Welcome", dim.width / 2, dim.margin - 3)

    //username

    ctx.fillStyle = "white"
    ctx.font = "30px Times New Roman"
    ctx.fillText(username, dim.width/2, dim.height - dim.margin - 8)

    //to server

    
    ctx.font = "20px Times New Roman"
    ctx.fillText("to the server", dim.width/2, dim.height - dim.margin + 14)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    console.log("Finishing generateImage in image.js");
    return attachment
}

console.log("Finishing image.js");
module.exports = generateImage