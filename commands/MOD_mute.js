module.exports = {
  name: 'mute',
  aliases: ['quiet'],
  description: 'Mutes a user.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    const {MuteRoleID} = require('../config.json');
    mentionedUser = message.mentions.members.first()
    try {
      if(!mentionedUser){
        respond('', 'User mention was not found.', message.channel)
        return
      }
      if (!args[1]){
        respond('',`Please provide a reason.`, message.channel);
        return;
      }
      if (message.author.id == mentionedUser.id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
      const {ModeratorRoleID} = require('../config.json');
      const checkmemberforroles = mentionedUser
      if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
      let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
      const reason = reasonraw.join(' ')
     const taggeduser = mentionedUser.id
     const guild = message.guild
     const role = guild.roles.cache.find(role => role.id === `${MuteRoleID}`);
     const mentionedmember = '<@'+message.mentions.users.first().id+'>'
      const member = mentionedUser;
     member.roles.add([role]);

           //Writes reason to JSON
           userLog = require('../logs/userMutes.json')

           if (!userLog[mentionedUser.id]){
            userLog[mentionedUser.id] = [];
           }
   
           userLog[mentionedUser.id].push(reason);
   
           respond('🔇 Mute',`You were muted due to:\n ${reason}`, member)
           respond('🔇 Mute',mentionedmember+` was muted. User has ${userLog[mentionedUser.id].length} mutes.`+`\nReason: ${reason}`, message.channel);

       fs.writeFile('./logs/userMutes.json', JSON.stringify(userLog), (err) => {
         if (err) {
           console.log(err);
           respond('',`An error occured during saving.`, message.channel);
           return;
         }
       })

      modaction(this.name, message.author.tag, message.channel.name, message.content, message)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
    }
  },
};