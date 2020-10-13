const express = require("express");
const router = express.Router();
const discordBot = require("./bot");
const Config = require('./config.json');
const url = require("url");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const Discord = require("discord.js");
const Strategy = require("passport-discord").Strategy;
const MemoryStore = require("memorystore")(session);

router.get("/api/domain", function(request, response) {
    let domain = Config.siteUrl;
    let port = Config.port;
    response.status(200).json({
      url: domain,
      port: port
    });
  });
router.get("/api/server", function(request, response){
    let serverInv = Config.server.invite;
    response.status(200).json({
        inviteCode: serverInv
    });
});
router.get("/s/join", function(request, response){
    let serverInv = Config.server.invite;
    response.redirect('https://discord.gg/invite/' + serverInv)
});
router.get("/api/bot", async function(request, response) {
    let authURL;
    let domain = process.env.PROJECT_DOMAIN;
    let uptime = process.uptime();
  
    try {
      authURL =
        "https://discordapp.com/api/oauth2/authorize?client_id=" +
        Config.bot.id +
        "&permissions=8&scope=bot";
    } catch (e) {
      console.error(e);
    }
  
    response.status(200).json({
      url: authURL,
      invite: Config.server.invite,
      uptime: uptime
  });
});


console.log('------------[ACTIVATING]-------------\nSHARD: api.js ONLINE - This is a standalone shard!\n-------------------------')
module.exports = router;