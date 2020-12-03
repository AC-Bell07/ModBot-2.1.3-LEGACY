module.exports = {
  name: 'memberinfo',
  aliases: ['infomember', 'userinfo', 'userlog'],
  description: 'Gets info about mentioned user',
  usage: '<user>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');

    const noteLog = require('../logs/userNotes.json')
    const warnLog = require('../logs/userwarnings.json')
    const muteLog = require('../logs/userMutes.json')
    const kickLog = require(`../logs/userKicks.json`)
    const banLog = require('../logs/userBans.json')
    try {
      const mentionedUser = message.mentions.users.first()
      if(!mentionedUser){
        respond(``, `No member was mentioned.`, message.channel)
        return;
      }
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('User Information')
        .setAuthor(mentionedUser.tag)
        .setDescription(`Member ID: ${mentionedUser.id}\n\nAccount creation date: ${mentionedUser.createdAt}\n\nServer join date: ${message.mentions.members.first().joinedAt}\n\nRoles: ${message.mentions.members.first().roles.cache.array().toString()}`)
        .setThumbnail(mentionedUser.displayAvatarURL())
        .setTimestamp()
        message.channel.send(memberinfoembed)

        if(!warnLog[mentionedUser.id] && !noteLog[mentionedUser.id] && !muteLog[mentionedUser.id] && !banLog[mentionedUser.id] && !kickLog[mentionedUser.id]){
          respond(``, `No entries found for this user in the user log.`, message.channel)
          return;
        }
        var list = []
        const embed = new Discord.MessageEmbed()
        .setTitle('User Log')
      if(noteLog[mentionedUser.id]){
         noteLog[mentionedUser.id].forEach(function (note, index) {
            embed.addField('Note: ' + (parseInt(index) + 1), note)
          list.push(`Note ${parseInt(index) + 1}: ${note}`)
        });
      }
      if(warnLog[mentionedUser.id]){
        warnLog[mentionedUser.id].forEach(function (warning, index) {
            embed.addField('Warning: ' + (parseInt(index) + 1), warning)
          list.push(`Warning ${parseInt(index) + 1}: ${warning}`)
        });
      }
      if(muteLog[mentionedUser.id]){
        muteLog[mentionedUser.id].forEach(function (Mute, index) {
            embed.addField('Mute: ' + (parseInt(index) + 1), Mute)
          list.push(`Mute ${parseInt(index) + 1}: ${Mute}`)
        });
      }
      if(kickLog[mentionedUser.id]){
        kickLog[mentionedUser.id].forEach(function (Kick, index) {
            embed.addField('Kick: ' + (parseInt(index) + 1), Kick)
          list.push(`Kick ${parseInt(index) + 1}: ${Kick}`)
        });
      }
      if(banLog[mentionedUser.id]){
        banLog[mentionedUser.id].forEach(function (Ban, index) {
            embed.addField('Ban: ' + (parseInt(index) + 1), Ban)
          list.push(`Ban ${parseInt(index) + 1}: ${Ban}`)
        });
      }
        console.log(list.length)
        console.log(list)
        console.log(args[1])
        if(list.length > 25 && args[1] != '--send'){
          respond('User Log', 'Error: Too many entries. Add `--send` to send a text file', message.channel)
          return
        }else if(list.length > 25 && args[1] == '--send'){
          sendUserLog = function(){
            fs.writeFile('./tempUserLog.txt', list.join('\n'), (err) => {
            message.channel.send({
              files: [{
                attachment: './tempUserLog.txt',
                name: 'userLog.txt'
              }]
            })
              .catch(console.error);
              setTimeout(()=>{
                if(fs.existsSync('./tempUserLog.txt')){
                  fs.unlinkSync('./tempUserLog.txt')
                }
              },3000)
          })
          }
              sendUserLog(list)
              return;
        }
        message.channel.send(embed).catch(err => {
          errorlog(err)
        })
  }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }

 
 }}