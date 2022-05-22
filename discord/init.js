console.log("[Discord] Initiated!");

global.Discord = {};
Discord.package = require('discord.js');
Discord.bot = new Discord.package.Client();
Discord.utils = require('./utils.js');
Discord.Config = JSON.parse(fs.readFileSync('discord/config.json', 'utf8'));
Discord.Commands = new Discord.package.Collection();
Discord.users = {};
Discord.Twitch = { channels: {} };

Discord.bot.login("*");

// EVENTS

///////////////////////
//// Ready   Event ////
///////////////////////

Discord.bot.on('ready', () => { // Is called when bot is logged in and ready to be used
    try {
        Discord.utils.Wait(500);
        mysql.connect(function (connected) {
            if (connected == null) {
                console.log("[MySQL] Connected!");

                // Retrieve user information and store it
                mysql.query(`SELECT * FROM users`, (err, result) => {
                    if (err) {
                        console.log("[MySQL] Pulling from table, users failed!");
                        console.error(err);
                    } else {
                        result.forEach(element => {
                            Discord.users[element.client_id] = {
                                id: element.client_id.toString(),
                                data: JSON.parse(element.data)
                            }
                        });

                        setInterval(Discord.utils.User.startSaveLoop, 5000);
                        
                    }
                });
                console.log("[Discord] Ready!");
            } else {
                console.error("[MySQL] Connection failed with: " + connected.message);
            }
        });
        Discord.utils.Twitch.channelSetup();
        setInterval(Discord.utils.StartStatusUpdate, 5000); // Starts the user count that is shown when clicking on the bot in discord
    } catch (err) {
        console.error(err)
    }
});

///////////////////////
//// EFT  Channels ////
///////////////////////

Discord.bot.on('voiceStateUpdate', (oldMember, newMember) => {
    try {
        let newChannel = newMember.voiceChannel;
        let oldChannel = oldMember.voiceChannel;

        if (newChannel != undefined) { // Joined Channel

            if (newChannel.name.startsWith(Discord.Config.tempChannels.prefix["create"])) {
                newChannel.clone(`${Discord.Config.tempChannels.prefix["delete"]} ${newMember.user.username}`, true, false)
                    .then(clone => {
                        clone.setParent('510995049723461672'); // Escape From Tarkov - Voice
                        clone.setUserLimit(newChannel.userLimit);
                        Discord.Config.tempChannels.EFTTemp.push(clone);
                        setTimeout(() => {
                            newMember.setVoiceChannel(clone.id);
                        }, 200);
                    })
                    .catch(console.error);
            }
        }
        if (oldChannel != undefined) { // Left Channel
            if (oldChannel.name.startsWith(Discord.Config.tempChannels.prefix["delete"])) {
                if(oldChannel.members.array().length <= 0) {
                    oldChannel.delete("No users left in temp channel");
                }
            }
        }

        Discord.utils.User.UpcRep(newMember.id);
    } catch (error) {
        console.error(error);
    }
});

///////////////////////
//// Message Event ////
///////////////////////

Discord.bot.on('message', message => {
    try {
        let sender = message.author;

        if (sender.id == Discord.bot.user.id) return; // Checks if the bot is sending the message.
        let content = message.content;
        if (Discord.users[sender.id] == null) {
            Discord.utils.User.CreateUser(sender.id)
        }
        
        if (content.startsWith(Discord.Config.prefix)) { // Checks if it was a command that was ran.
            let cmdContent = content.slice(Discord.Config.prefix.length).split(" "); // Removes prefix from command
            let cmd = Discord.Commands.get(cmdContent[0]) // Grabs command name
            
            let args = cmdContent.slice(1);
            
            let timeRan = new Date();
            if (cmd) {
                if (!cmd.config.active) {
                    if (message.channel.type != 'dm' && cmd.config.deleteCommand) message.delete();
                    message.author.send({
                        embed: {
                            title: "Error:",
                            description: "You have ran an invalid command, " + cmdContent,
                        }
                    })
                    return;
                }
                if (cmd.config.adminOnly && Discord.utils.User.isStaff(message.member) == false) {
                    message.author.send("You do not have permission for this command!");
                    message.delete();
                    return;
                }
                if (message.channel.type != 'dm' && cmd.config.deleteCommand) message.delete();
                cmd.run(Discord.bot, message, args, timeRan);
            } else {
                if (message.channel.type != 'dm') message.delete();
                message.author.send({
                    embed: {
                        title: "Error:",
                        description: "You have ran an invalid command, " + cmdContent,
                    }
                })
            }
            return
        }

        if (message.channel.type == 'dm') return;

        Discord.utils.User.UpcRep(sender.id);
    } catch (err) {
        console.error(err);
    }
});

///////////////////////
//// User     Join ////
///////////////////////

Discord.bot.on('guildMemberAdd', member => {
    try {
        let introduction = Discord.Config.channels["introduce"];
        let assignRole = Discord.Config.channels["roles"];
        let communityInfo = Discord.Config.channels["cInfo"];
        member.send({embed:{
            description:`
        Welcome to Altered Gaming Community!

        Thank you for joining our discord. As a part of this community we recommend full user engagement and activity. We encourage you to type a quick/brief introduction in the Introduce Yourself channel and also set regions role ${assignRole} channel! Other then that welcome here, we hope you enjoy your stay and find some people to join up with.
        
        To access game specific text/voice channels you will be required to assign your game role in the #assign-your-game-roles`
        }});
        member.addRole(Discord.Config.roles["deckcrew"]);
    } catch (err) {
        console.error(err)
    }
})

///////////////////////
//// Message React ////
///////////////////////

Discord.bot.on('messageReactionAdd', (reaction, user) => {
    try {
        switch (reaction.message.id) { // Check Message Id
            case "510998670691270666": // Games // Flags/Regions
                if (Discord.Config.reactions[reaction.emoji.name] != null) {
                    
                    let member = Discord.bot.guilds.first().members.filter(rMember => rMember.user.id == user.id).first();     
                    member.addRole(Discord.Config.reactions[reaction.emoji.name].role)
                }
                break;
        }
    } catch (err) {
        console.error(err)
    }
});

Discord.bot.on('messageReactionRemove', (reaction, user) => {
    try {
        switch (reaction.message.id) { // Check Message Id
            case "510998670691270666": // Games // Flags/Regions
                if (Discord.Config.reactions[reaction.emoji.name] != null) {

                    let member = Discord.bot.guilds.first().members.filter(rMember => rMember.user.id == user.id).first();
                    member.removeRole(Discord.Config.reactions[reaction.emoji.name].role)
                }
                break;
        }
    } catch (err) {
        console.error(err)
    }
});

Discord.bot.on("error", (e) => console.error(e));
Discord.bot.on("warn", (e) => console.warn(e));
Discord.bot.on("debug", (e) => console.info(e));

// END EVENTS


fs.readdir('./discord/commands/', (err, files) => { // This will get all the commands in the commands folder
    try {
        if (err) {
            return console.error(err)
        };
        
        var jsfiles = files.filter(f => f.split('.').pop() == 'js'); // Checks file for .js extension
        if (jsfiles.length <= 0) { // If no commands, it will return
            return console.error("No commands found!");
        } else {
            console.log(jsfiles.length + " Commands found...");
        };

        let loaded = "Commands:";
        jsfiles.forEach((f, i) => { // Loops through commands and runs the code.
            var cmds = require('./commands/' + f);
            loaded = loaded + ` ${f}`;
            Discord.Commands.set(cmds.config.command, cmds); // Gets the command and the modules in the file
        });

        console.log(loaded + " have been loaded.");
    
    } catch (err) {
        console.error(err)
    }
})

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

Discord.bot.on('raw', async event => {
    try {
        // `event.t` is the raw event name
        if (!events.hasOwnProperty(event.t)) return;

        const { d: data } = event;
        const user = Discord.bot.users.get(data.user_id);
        const channel = Discord.bot.channels.get(data.channel_id) || await user.createDM();

        // if the message is already in the cache, don't re-emit the event
        if (channel.messages.has(data.message_id)) return;

        // if you're on the master/v12 branch, use `channel.messages.fetch()`
        const message = await channel.fetchMessage(data.message_id);

        // custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
        // if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.get(emojiKey);

        Discord.bot.emit(events[event.t], reaction, user);
    } catch (error) {
        console.error(error);
            
    }
});
