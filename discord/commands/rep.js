module.exports.run = async (bot, message, args, time) => { // Whatever is inside this will be ran when the commannd is ran.
    var newTime = new Date().getTime();
    if (message.channel.type == "dm") return;
    let channelId = message.channel.id
    if (args.length <= 0) {
        message.author.send("```asciidoc\n= Need Help? =\n!rep [check/give] ```");
    } else if (args.length == 1) {
        if (args[0] == "check") {
            if (channelId == Discord.Config.channels["cRep"]) {
                var cRepPoints = Discord.users[message.author.id] != null ? Discord.users[message.author.id].data.cRep.amount : 0
                message.channel.send({
                    embed: {
                        title: "Reputation Points",
                        fields: [{
                                "name": "Commmunity:",
                                "value": cRepPoints
                            }
                        ]
                    }
                })
            } else {
                if (message.channel.type != "dm") message.delete();
            }
        } else if (args[0] == "give") {
            message.author.send("```asciidoc\n= Whoops! You didn't select a person or an amount. =\n!rep give [@person] ```");
        }
    } else if (args.length == 2) {

        if (args[0] == "check") {
            args[1] = args[1].replace(/[<@!>]/g, '');
            var toUser = bot.users.get(args[1])

            if (toUser != null) { // Check if the user is valid
                
                if (channelId == Discord.Config.channels["cRep"]) {
                    
                    var toUsercommRep = Discord.users[toUser.id] != null ? Discord.users[toUser.id].data.cRep.amount : 0

                    message.channel.send({
                        embed: {
                            title: toUser.username + "'s Reputation Points",
                            fields: [{
                                    "name": "Commmunity:",
                                    "value": toUsercommRep
                                }
                            ]
                        }
                    })
                } else {
                    if (message.channel.type != "dm") message.delete();
                }
            } else {
                message.author.send({
                    embed: {
                        title: "Error:",
                        description: "You have entered an invalid user. Do !rep for help.",
                    }
                })
            }
        }
    } else if (args.length > 2) {
        if (args[0] == "add") {
            
            if (args[1] == "community") {
                if (bot.isUserStaff(message.member)) {
                    args[2] = args[2].replace(/[<@!>]/g, '');
                    var toUser = bot.users.get(args[2])

                    if (toUser != null) { // Check if the user is valid
                        if (Discord.users[toUser.id] == null) bot.createUserTable(toUser.id);
                        let amountToGive = args[3] > 0 ? args[3] : 1; 
                        Discord.users[toUser.id].data.cRep.amount = Number(Discord.users[toUser.id].data.cRep.amount) + Number(amountToGive);
                        bot.log({
                            title: "Community Reputation Given by Staff",
                            description: `
                            **From:** ${message.author.username}
                            **To:** ${toUser.username}
                            **Amount Given:** ${amountToGive}
                            **${toUser.username}'s Total:** ${Discord.users[toUser.id].data.cRep.amount}
                            `
                        })
                        message.delete();
                    }
                } else {
                    message.delete();
                    message.author.send({
                        embed: {
                            title: "Error:",
                            description: "You do not have permission for this command.",
                        }
                    })
                }
            }
        } else if (args[0] == "remove") {
            if (args[1] == "community") {
                if (bot.isUserStaff(message.member)) {
                    args[2] = args[2].replace(/[<@!>]/g, '');
                    var toUser = bot.users.get(args[2])

                    if (toUser != null) { // Check if the user is valid
                        if (Discord.users[toUser.id] == null) bot.createUserTable(toUser.id);
                        let amountToGive = args[3] > 0 ? args[3] : 1; 
                        Discord.users[toUser.id].data.cRep.amount = Number(Discord.users[toUser.id].data.cRep.amount) - Number(amountToGive);
                        bot.log({
                            title: "Community Reputation Removed by Staff",
                            description: `
                            **From:** ${message.author.username}
                            **To:** ${toUser.username}
                            **Amount Removed:** ${amountToGive}
                            **${toUser.username}'s Total:** ${Discord.users[toUser.id].data.cRep.amount}
                            `
                        })
                        message.delete();
                    }
                } else {
                    message.delete();
                    message.author.send({
                        embed: {
                            title: "Error:",
                            description: "You do not have permission for this command.",
                        }
                    })
                }
            }
        }
    }

}

module.exports.config = { // Config for the command
    active: true,
    command: "rep",
    deleteCommand: false
}