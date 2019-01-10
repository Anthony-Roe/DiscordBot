module.exports.run = async (bot, message, args, time) => { // Whatever is inside this will be ran when the commannd is ran.
    
    if (args.length < 2 & args[0] != "list") {
        message.channel.send("Usage: !twitch add/remove TWITCHNAME");
    } else {
        if (args[0] == "add") {
            let twitchName = args[1];
            Discord.Twitch.channels[twitchName] = {
                id:twitchName,
                data:{
                    online:false,
                    timestamp:0
                }
            }
            Discord.utils.Log({
                    title: "Twitch:",
                    description: twitchName + " has been added to the streaming list.",
            })
        } else if(args[0] == "remove") {
            let twitchName = args[1];
            Discord.Twitch.channels[twitchName].data = false;
            message.author.send({
                embed: {
                    title: "Success:",
                    description: "You have removed, " + twitchName + " from the streaming list.",
                }
            })
        } else if (args[0] == "list") {
            let twitchChannels = Object.keys(Discord.Twitch.channels);
            console.log(twitchChannels);
            
            let channels = twitchChannels.join(" | ");

            console.log(channels);
            

            Discord.utils.Log({
                "title":"Streamer List",
                "description": "*" + channels + "*"
            })
            
        }
        
    }
}

module.exports.config = { // Config for the command
    active: true,
    adminOnly: true,
    command: "twitch",
    deleteCommand: false
}