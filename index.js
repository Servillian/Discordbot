const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;
const ms = require("ms");
const PREFIX = '$';

bot.on('ready', () => {
    console.log("Sheer Heart Attack has no weaknesses")
} )
bot.on('message', msg => {

    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]) {
        case 'hi':
            msg.channel.sendMessage("KILLER QUEEN HAS ALREADY TOUCHED THE DOORKNOB!")
            break;

        case 'clear':
            if (!args[1]) return msg.reply('Please state how many messages to delete')
            msg.channel.bulkDelete(args[1]);
            break;
            case 'mute':
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
     
     
                msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
     
                setTimeout(function(){
                   
                    person.addRole(mainrole.id)
                    person.removeRole(role.id);
                    console.log(role.id)
                    msg.channel.send(`@${person.user.tag} has been unmuted.`)
                }, ms(time));
     
     
       
            break;
        }
}) 


bot.login(token);
