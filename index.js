const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
const ms = require("ms");
const PREFIX = '$';
var servers = {};
const ytdl = require("ytdl-core");

bot.on('ready', () => {
    console.log("Sheer Heart Attack has no weaknesses")
} )
bot.on('msg', msg => {

    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case 'hi':
            msg.channel.sendMessage("KILLER QUEEN HAS ALREADY TOUCHED THE DOORKNOB!")
            break;

        case 'clear':
            if ((msg.author.id == '276296416912080897') || (msg.author.id == '596717383842791438')) { 
                if (!args[1]) return msg.reply('Please state how many messages to delete')
                msg.channel.bulkDelete(args[1]);
                break;
            }



        case 'play':

            function play(connection,msg) {
                var server = servers[msg.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}))

                server.queue.shift();

                server.queue.push(args[1]);

                server.dispatcher.on("end", function(){
                    if(server.queue[0]) {
                        play(connection, msg)
                    } else {
                        connection.disconnect();
                    }
                });
            }
            if(!args[1]) {
                msg.channel.send("You must provide a link");
                return;
            }

            if(!msg.member.voiceChannel) {
                msg.channel.send("You must be in a voice channel to use this command");
                return;
            }

            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }
            
            var server = servers[msg.guild.id];

            if(!msg.guild.connection) msg.member.voiceChannel.join().then(function(connection){
                play(connection, msg);
            })
            break;

        case 'mute':
            if ((msg.author.id == '276296416912080897') || (msg.author.id == '596717383842791438')) {
                var person  = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]));
                if(!person) return  msg.reply("Cannot find the user " + person)

                let mainrole = msg.guild.roles.find(role => role.name === "Lifeform");
                let role = msg.guild.roles.find(role => role.name === "Muted");
        

                if(!role) return msg.reply("Couldn't find the mute role")
                

            let time = args[2];
            if(!time){
                return msg.reply("You didnt specify a time!");
            }

            person.removeRole(mainrole.id)
            person.addRole(role.id);


            msg.channel.send(`@${person.user.tag} has now been muted for ${(ms(ms(time)))}`)

            setTimeout(function(){
            
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                msg.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));



        break;
        }
    }
}) 


bot.login(token);
