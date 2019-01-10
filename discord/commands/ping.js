module.exports.run = async (bot, message, args, time) => { // Whatever is inside this will be ran when the commannd is ran.
    var newTime = new Date();
    
    message.channel.send({
        embed: {
            title: "Ping!",
            description: "Pong!",
            fields: [{
                name: "Time taken",
                value: "*Took " + (newTime - time) + " ms.*"
            }]
        }
    })
}

module.exports.config = { // Config for the command
    active: true,
    command: "ping",
    deleteCommand: true
}