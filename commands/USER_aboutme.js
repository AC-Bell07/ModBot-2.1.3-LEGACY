module.exports = {
  name: 'aboutme',
  aliases: ['myinfo'],
  description: 'Gets info about you',
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const noteLog = require('../logs/userNotes.json')
    const warnLog = require('../logs/userwarnings.json')
    const muteLog = require('../logs/userMutes.json')
    const kickLog = require(`../logs/userKicks.json`)
    const banLog = require('../logs/userBans.json')
    const user = message.author
    try {
      const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('User Information')
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(message.author.tag)
        .setDescription(`Server join date: ${message.member.joinedAt}`)
        .setTimestamp()
        message.channel.send(memberinfoembed)
        
        const embed = new Discord.MessageEmbed()
        .setTitle('User Log')
        list = []
        if(!warnLog[user.id] && !noteLog[user.id] && !muteLog[user.id] && !banLog[user.id] && !kickLog[user.id]){
          embed.setDescription('No User Log entries found.')
          return message.channel.send(embed)
          }
        if(warnLog[user.id]){
          warnLog[user.id].forEach(function (warning, index) {
              embed.addField('Warning: ' + (parseInt(index) + 1), warning)
            list.push(`Warning ${parseInt(index) + 1}: ${warning}`)
          });
        }
        if(muteLog[user.id]){
          muteLog[user.id].forEach(function (Mute, index) {
              embed.addField('Mute: ' + (parseInt(index) + 1), Mute)
            list.push(`Mute ${parseInt(index) + 1}: ${Mute}`)
          });
        }
        if(kickLog[user.id]){
          kickLog[user.id].forEach(function (Kick, index) {
              embed.addField('Kick: ' + (parseInt(index) + 1), Kick)
            list.push(`Kick ${parseInt(index) + 1}: ${Kick}`)
          });
        }
        if(banLog[user.id]){
          banLog[user.id].forEach(function (Ban, index) {
              embed.addField('Ban: ' + (parseInt(index) + 1), Ban)
            list.push(`Ban ${parseInt(index) + 1}: ${Ban}`)
          });
        }
        const embedPublic = new Discord.MessageEmbed()
        .setTitle('User Log')
        .setDescription(`User Log information was sent to your Direct Message!`)
        message.channel.send(embedPublic)
        if(list.length > 25){
          return respond('User Log', 'Error: Too many entries! Please contact a moderator for information.', message.channel)
        }else{
          return message.author.send(embed)
        }
}catch(error) {
  respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
  errorlog(error)
  // Your code broke (Leave untouched in most cases)
  console.error('an error has occured', error);
}}}