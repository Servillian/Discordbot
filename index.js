const Discord = require('discord.js');
const bot = new Discord.Client();
const client = new Discord.Client();
const queue = new Map();
const token = process.env.BOT_TOKEN;
const ms = require("ms");
const PREFIX = '$';
var servers = {};
const ytdl = require("ytdl-core");

bot.on('ready', () => {
    console.log("Sheer Heart Attack has no weaknesses")
} )
bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case 'hi':
            message.channel.sendMessage("KILLER QUEEN HAS ALREADY TOUCHED THE DOORKNOB!")
            break;

        case 'clear':
            if ((message.author.id == '276296416912080897') || (message.author.id == '596717383842791438')) { 
                if (!args[1]) return message.reply('Please state how many messages to delete')
                message.channel.bulkDelete(args[1]);
                break;
            }



        case 'play':
            async function execute(message, serverQueue) {
                const args = message.content.split(' ');
            
                const voiceChannel = message.member.voiceChannel;
                if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                    return message.channel.send('I need the permissions to join and speak in your voice channel!');
                }
            
                const songInfo = await ytdl.getInfo(args[1]);
                const song = {
                    title: songInfo.title,
                    url: songInfo.video_url,
                };
            
                if (!serverQueue) {
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 5,
                        playing: true,
                    };
            
                    queue.set(message.guild.id, queueContruct);
            
                    queueContruct.songs.push(song);
            
                    try {
                        var connection = await voiceChannel.join();
                        queueContruct.connection = connection;
                        play(message.guild, queueContruct.songs[0]);
                    } catch (err) {
                        console.log(err);
                        queue.delete(message.guild.id);
                        return message.channel.send(err);
                    }
                } else {
                    serverQueue.songs.push(song);
                    console.log(serverQueue.songs);
                    return message.channel.send(`${song.title} has been added to the queue!`);
                }
            
            }
            function play(guild, song) {
                const serverQueue = queue.get(guild.id);
            
                if (!song) {
                    serverQueue.voiceChannel.leave();
                    queue.delete(guild.id);
                    return;
                }
            
                const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                    .on('end', () => {
                        console.log('Music ended!');
                        serverQueue.songs.shift();
                        play(guild, serverQueue.songs[0]);
                    })
                    .on('error', error => {
                        console.error(error);
                    });
                dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            }


        case 'mute':
            if ((message.author.id == '276296416912080897') || (message.author.id == '596717383842791438')) {
                var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                if(!person) return  message.reply("Cannot find the user " + person)

                let mainrole = message.guild.roles.find(role => role.name === "Lifeform");
                let role = message.guild.roles.find(role => role.name === "Muted");
        

                if(!role) return message.reply("Couldn't find the mute role")
                

            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }

            person.removeRole(mainrole.id)
            person.addRole(role.id);


            message.channel.send(`@${person.user.tag} has now been muted for ${(ms(ms(time)))}`)

            setTimeout(function(){
            
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));



        break;
        }
    }
}) 


bot.login(token);
