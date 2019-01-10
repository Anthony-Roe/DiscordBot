module.exports.run = async (bot, message, args, time) => { // Whatever is inside this will be ran when the commannd is ran.
    if (args.length < 2) {
        message.channel.send("Usage: !warn @Player Reason");
    } else {
        args[0] = args[0].replace(/[<@>]/g, '');
        let toUser = Discord.bot.users.get(args[0]);
        
        let removeUser = args.slice(1);
        let reason = removeUser.join(" ");


        if (toUser != null) {
            toUser.send({
                embed: {
                    title: "You were warned for the following reason:",
                    description: reason,
                    color: 0xff0303,
                }
            })
            message.channel.send({
                embed: {
                    title: toUser.username + " has been warned for the following reason:",
                    description: reason,
                    color: 0xff0303,
                }
            })
            Discord.utils.Log({
                title: "Community Warning Issued",
                description: `
                **From:** ${message.author.username}
                **To:** ${toUser.username}
                **Description of Warning:** ${reason}
                **# of warning(s):** ${Discord.utils.User.GetWarns(toUser.id).length + 1}
                `
            })
            Discord.utils.User.Warn(message.author, toUser, reason);
        } else if (args[0] == "view") {
            console.log(args[1]);
            
            args[1] = args[1].replace(/[<@>]/g, '');
            let toUser = Discord.bot.users.get(args[1]);
            if (toUser != null) {
                let warnings = Discord.utils.User.GetWarns(toUser.id);
                if (warnings != false) {
                    let fields = []
                    warnings.forEach(warning => {
                        fields.push({
                            "name":"Admin: " + warning.admin,
                            "value":"Reason: " + warning.reason,
                            "inline":false
                        })
                    });
                    message.channel.send({embed:{
                        "title":toUser.username + "'s warnings",
                        "fields":fields
                    }})
                } else {
                    message.channel.send(toUser.username + " has no warnings.");
                }
            }
        } else if (args[0] == "remove") {
            
            args[1] = args[1].replace(/[<@>]/g, '');
            let toUser = Discord.bot.users.get(args[1]);
            if (toUser != null) {
                Discord.utils.User.RemoveWarns(toUser.id);
                Discord.utils.Log({
                    title: "Community Warnings Revoked",
                    description: `
                    **Admin:** ${message.author.username}
                    **User:** ${toUser.username}
                    `
                })
                message.channel.send({
                    embed: {
                        title: toUser.username + "'s warnings have been removed",
                        color: 0x03ff03,
                    }
                })
            } else {
                message.channel.send(toUser.username + " has no warnings.");
            }
        }
    }
}

module.exports.config = { // Config for the command
    active: true,
    adminOnly: true,
    command: "warn",
    deleteCommand: true
}