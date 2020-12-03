module.exports = {
    name: 'idmemberinfo',
    aliases: ['memberinfoid', 'userinfoid', 'userlogid'],
    description: 'Gets info about ID number mentioned',
    usage: '<id>',
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
        if(!args[0]){
          return respond('', 'Please provide a member ID.', message.channel)
        }
          const memberinfoembed = new Discord.MessageEmbed()
          .setColor('#00FF00')
          .setTitle('User Information')
          .setAuthor(args[0])
          .setDescription(`Member ID: ${args[0]}\n\nAccount creation date: _This information is currently unavailable._\n\nServer join date: _This information is currently unavailable._`)
          .setTimestamp()
          message.channel.send(memberinfoembed)
  
          var list = []
          const embed = new Discord.MessageEmbed()
          .setTitle('User Log')
          if(!warnLog[args[0]] && !noteLog[args[0]] && !muteLog[args[0]] && !banLog[args[0]] && !kickLog[args[0]]){
          embed.setDescription('No User Log entries found.')
          return message.channel.send(embed)
          }
        if(noteLog[args[0]]){
           noteLog[args[0]].forEach(function (note, index) {
              embed.addField('Note: ' + (parseInt(index) + 1), note)
            list.push(`Note ${parseInt(index) + 1}: ${note}`)
          });
        }
        if(warnLog[args[0]]){
          warnLog[args[0]].forEach(function (warning, index) {
              embed.addField('Warning: ' + (parseInt(index) + 1), warning)
            list.push(`Warning ${parseInt(index) + 1}: ${warning}`)
          });
        }
        if(muteLog[args[0]]){
          muteLog[args[0]].forEach(function (Mute, index) {
              embed.addField('Mute: ' + (parseInt(index) + 1), Mute)
            list.push(`Mute ${parseInt(index) + 1}: ${Mute}`)
          });
        }
        if(kickLog[args[0]]){
          kickLog[args[0]].forEach(function (Kick, index) {
              embed.addField('Kick: ' + (parseInt(index) + 1), Kick)
            list.push(`Kick ${parseInt(index) + 1}: ${Kick}`)
          });
        }
        if(banLog[args[0]]){
          banLog[args[0]].forEach(function (Ban, index) {
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
          }else{
            message.channel.send(embed)
          }
    }catch(error) {
        respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
        errorlog(error)
        // Your code broke (Leave untouched in most cases)
        console.error('an error has occured', error);
        }
  
    }
  }