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
