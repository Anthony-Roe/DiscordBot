module.exports.run = async (bot, message, args, time) => { // Whatever is inside this will be ran when the commannd is ran.
    message.author.send({
        embed:{
            title:"Bot Commands",
            description:`
            **!rep check** - Check your reputation points
            `
        }
    });
}

module.exports.config = { // Config for the command
    active: false,
    command: "help",
    deleteCommand: true
}