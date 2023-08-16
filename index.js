const fs = require('fs');
const {Client, Collection , Intents} = require('discord.js');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const fivereborn = require('fivereborn-query')
const config = require('./config.json')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

const Discord = require('discord.js');
client.discord = Discord;

const eventFolder = fs.readdirSync("./events");

eventFolder.forEach(folder => {
    let underFolder = fs.readdirSync("./events/" + folder);

    for (const file of underFolder) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args, client));
    };
});

client.on('ready', () => {
    console.log(`${client.user.tag} Opérationnel`)
    function activity(){ 
        setTimeout(() => { 
            fivereborn.query(config.SERVER_IP,config.SERVER_PORT, (err, data) => {
                if (err) {
                    return console.log(err);
                } else { 
                    client.user.setActivity(`${data.clients} joueur(s) sur ${config.discordName}`, { type: "WATCHING" });
                }
            });
            activity();
        }, 1000);
    }
    activity();
});

client.login(config.token);