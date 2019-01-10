module.exports.run = async (bot, message, args, time) => { // Whatever is inside this will be ran when the commannd is ran.
    try {
        if (args.length <= 0) {
            message.author.send("Usage: !purge #")
        } else {
            
            let fetched = await message.channel.fetchMessages({limit: args[0]});
            
            message.channel.bulkDelete(fetched)
                .catch((err) => {console.log(err)});
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports.config = { // Config for the command
    adminOnly: true,
    active: true,
    command: "purge",
    deleteCommand: true
}