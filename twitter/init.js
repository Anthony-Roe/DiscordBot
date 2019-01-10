console.log("[Twitter] Initiated!");

global.Twitter = {};
Twitter.package = require('twit');
Twitter.config = require('./config.js');
Twitter.bot = new Twitter.package(Twitter.config);