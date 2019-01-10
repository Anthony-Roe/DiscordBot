exports.Debug = function(message) {   
    console.log('Debug');
    if ( Discord.Config.Debug == true )
        console.log(message);
}

exports.StartStatusUpdate = function() {
    console.log('StatusUpdate');
    try {
        let users = Discord.bot.users.filter(users => users.bot == false).array(); // Gets all users in the discord and turns it into an array
        
        Discord.bot.user.setPresence({ game: { name: `with ${users.length} members`, type: "PLAYING"}, status: 'online', afk: false,  });

    } catch (err) {
        console.error(err);
    }
}

exports.Wait = function(ms) {
    console.log('Wait');
    try {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    } catch (err) {
        console.error(err);
    }
}

exports.Log = function(data) {
    console.log('Log');
    let channel =  Discord.bot.channels.filter(channel => channel.id == Discord.Config.channels["bLog"]).first();
    channel.send({embed:{
        title: data.title ? data.title : "Untitled Log",
        description: data.description ? data.description : "No description",
        fields: data.fields ? data.fields : null,
        timestamp: new Date()
    }});
}

// USER Functions //

exports.User = {}

exports.User.startSaveLoop = function() {
    console.log('saveLoop');
    try {
        Object.keys(Discord.users).forEach(element => {
            try {
                if (Discord.users[element].id) {
                    mysql.query("SELECT * FROM users WHERE client_id = " + Discord.users[element].id + " LIMIT 1", function (err, result, fields) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (result.length <= 0) {
                                let sql = "INSERT INTO users (client_id, data) VALUES (" + Discord.users[element].id + ", '" + JSON.stringify(Discord.users[element].data) + "');"

                                mysql.query(sql, function (err, result) {
                                    if (err) throw err;
                                });
                            } else {
                                let sql = "UPDATE users SET data = '" + JSON.stringify(Discord.users[element].data) + "' WHERE client_id = '" + Discord.users[element].id + "'";
                                mysql.query(sql, function (err, result) {
                                    if (err) throw err;
                                });
                            }
                        }
                    });
                } else {
                    delete Discord.users[element];
                }
            } catch(err) {
                console.error(err);
            }
            
        });
    } catch (err) {
        console.error(err);
    }
}

exports.User.CreateUser = function(userId, callback) {
    console.log('createUser');
    try {
        if(Discord.users[userId] != null) {
            callback(Discord.users[userId]);
            return;
        }
        userId = userId.replace(/[<@!>]/g, ''); // Removes characters that will break it
        let user =  Discord.bot.users.filter(user => user.id == userId).array();
        console.log(user.length);
        console.log(user.id);
        
        if (user.length > 0) {
            Discord.users[user.id] = {
                id: user.id,
                data: {
                    cRep: {
                        lastRecieve: 0,
                        amount: 0
                    },
                }
            }
            callback(Discord.users[user.id]);
        } else {
            console.error("[User Creation] User could not be created: " + userId);
        }
    } catch (err) {
        console.error(err);
    }
}

exports.User.RemoveWarns = function(userId) {
    console.log('RemoveWarns');
    try {
        exports.User.CreateUser(userId, () => {
            if (Discord.users[userId].data.warns != null) {
                Discord.users[userId].data.warns = null
            } else {
                return false
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.User.GetWarns = function(userId) {
    console.log('GetWarns');
    try {
        exports.User.CreateUser(userId, () => {
            if (Discord.users[userId].data.warns != null) {
                return Discord.users[userId].data.warns
            } else {
                return false
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.User.Warn = function(author, user, warning) {
    console.log('Warn');
    try {
        exports.User.CreateUser(user.id, () => {
            let data = {
                admin:author.username,
                reason:warning
            }
            if (Discord.users[user.id].data.warns == null) {
                Discord.users[user.id].data.warns = []
                Discord.users[user.id].data.warns.push(data);
            } else {
                Discord.users[user.id].data.warns.push(data);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.User.UpcRep = function(userId) {
    console.log('UpcRep');
    try {
        exports.User.CreateUser(userId, () => {
            if (Discord.users[userId].data.cRep.lastRecieve <= (new Date().getTime() / 1000)) {
                Discord.users[userId].data.cRep.lastRecieve = (new Date().getTime() / 1000) + Discord.Config.cRepTime;
                Discord.users[userId].data.cRep.amount++;
            }
        });
    } catch (err) {
        console.error(err)
    }
}

exports.User.isStaff = function(member) {
    console.log('isStaff');
    let staffRole = false;
    Object.keys(Discord.Config.staffRoles).forEach(role => {
        
        let hasRole = member.roles.find(val => val.id === Discord.Config.staffRoles[role]);
        if (hasRole) {
            staffRole = role;
        }
    });
    
    return staffRole;
}










/////////////////////////
//   Twitch    Stuff   //
/////////////////////////

exports.Twitch = {};

exports.Twitch.channelSetup = function() {
    console.log('channelSetup');
    try {
        mysql.query(`SELECT * FROM twitch_channels`, (err, result) => {
            if (err) {
                console.log("[MySQL] Pulling from table, twitch_channels failed!");
                console.error(err);
            } else {
                result.forEach(element => {
                    Discord.Twitch.channels[element.channel_name] = {
                        id: element.channel_name.toString(),
                        data: JSON.parse(element.data)
                    }
                });
                setInterval(exports.Twitch.startSaveLoop, 10000);
                setInterval(exports.Twitch.checkLive, 5000);
            }
        });
    } catch (err) {
        console.error(err.message);
    }
}

exports.Twitch.startSaveLoop = function() {
    console.log('startSaveLoop');
    try {
        Object.keys(Discord.Twitch.channels).forEach(element => {
            try {
                mysql.query("SELECT * FROM twitch_channels WHERE channel_name = '" + Discord.Twitch.channels[element].id + "' LIMIT 1", function (err, result, fields) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result.length <= 0) {
                            var sql = "INSERT INTO twitch_channels (channel_name, data) VALUES ('" + Discord.Twitch.channels[element].id + "', '" + JSON.stringify(Discord.Twitch.channels[element].data) + "');"
                            mysql.query(sql, function (err, result) {
                                if (err) console.log(err);
                            });
                        } else {
                            if (Discord.Twitch.channels[element].id != null && Discord.Twitch.channels[element].data == false) {
                                let sql = "DELETE from twitch_channels WHERE channel_name = '" + Discord.Twitch.channels[element].id + "' LIMIT 1"
                                mysql.query(sql, function (err, result) {
                                    if (err) console.log(err);
                                });
                                delete Discord.Twitch.channels[element];
                            } else {
                                var sql = "UPDATE twitch_channels SET data = '" + JSON.stringify(Discord.Twitch.channels[element].data) + "' WHERE channel_name = '" + Discord.Twitch.channels[element].id + "'";
                                mysql.query(sql, function (err, result) {
                                    if (err) console.log(err);
                                });
                                
                            }
                        }
                    }
                });
            } catch(err) {
                console.error(err);
            }
            
        });
    } catch (err) {
        console.log(err);
    }
}

exports.Twitch.checkLive = function() {
    console.log('checkLive');
    try {
        Object.keys(Discord.Twitch.channels).forEach(channel => {
            if (Discord.Twitch.channels[channel] != null) {
                exports.Twitch.callApi(Discord.Twitch.channels[channel], exports.Twitch.apiCallback, true);
            }
        });   
    } catch (error) {
        console.error(error);
    }
}

exports.Twitch.callApi = function(twitchChannel, callback, getStreamInfo) {
    console.log('callApi');
    let opt;
    try {
        let apiPath = "/kraken/channels/" + twitchChannel.id;

        opt = {
            host: "api.twitch.tv",
            path: apiPath,
            headers: {
                Host: 'api.twitch.tv',
                "Client-ID": 'k0e1bty586b7l82tcp2fr9s41avhi6',
                Accept: "application/vnd.twitchtv.v3+json"
            }
        };
    }
    catch(err){
		if (err) {
            console.log(err);
            return;
		} else {
			console.log("Error: Func: 'callApi' in try catch")
		}
    }

    https.get(opt, (res)=>{
        let body = "";

        res.on("data", (chunk)=>{
            body += chunk;
        });

        res.on("end", ()=>{
            var json;
            try {
                json = JSON.parse(body);
            }
            catch(err){
                console.log(err);
                return;
            }
            if(json.status == 404){
                console.log(404);
            }else{
                callback(twitchChannel, json);
            }
        });

    }).on("error", (err)=>{
        console.log(err);
    });
}

exports.Twitch.apiCallback = function(twitchChannel, res) {
    console.log('apiCallback');
    if(res){
        if (res.stream == null){
            twitchChannel.data.online = false;
        } else {
            if (!twitchChannel.data.online && twitchChannel.data.timestamp < (Date.now() / 1000)){
                try {
                    let channel =  Discord.bot.channels.filter(channel => channel.id == Discord.Config.channels["twitch"]).first();
                    if(channel){
                        channel.send(
                            {embed:{
                                "author": {
                                    "name": res.stream.channel.display_name,
                                    "url": res.stream.channel.url
                                },
                                "title": res.stream.channel.status,
                                "url": res.stream.channel.url,
                                "color": 0x9689b9,
                                "timestamp": new Date(),
                                "fields":[
                                    {
                                        "name": "Game",
                                        "value": res.stream.game,
                                        "inline": true
                                    },
                                    {
                                        "name": "Viewers",
                                        "value": res.stream.viewers,
                                        "inline": true
                                    },
                                    {
                                        "name": "Followers",
                                        "value": res.stream.channel.followers,
                                        "inline": true
                                    }
                                ],
                                "thumbnail": {
                                    "url": res.stream.channel.logo
                                },
                                "image": {
                                    "url": res.stream.preview.large,
                                },
                                "footer": {
                                    "icon_url": "./images/logo.png",
                                    "text": "Kraken"
                                }
                            }
                        });
                        twitchChannel.data.online = true;
                        twitchChannel.data.timestamp = (Date.now() / 1000) + 21600;
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
        }
    }
}