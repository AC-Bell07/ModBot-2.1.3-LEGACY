module.exports = {
    name: 'news',
    aliases: ['newsletter','changelog'],
    description: 'Shows new features and more about Nexus.',
    usage: '',
    cooldown: 0,
    mod:false,
      execute(message, args, client) {
      const Discord = require('discord.js');
      
      const fs = require('fs');
      try {
      fs.readFile('./news.txt', (err, data) => {
        if (err) {
          console.error(err)
          const creditsembed = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle('Newsletter')
          .addFields(
                 
          )
          .setTimestamp()
          message.channel.send(creditsembed)
  
          return
        }
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('News')
        .addFields(
          { name: 'News', value: data, inline: false },
        )
        .setTimestamp()
        message.channel.send(memberinfoembed)
      }) }catch(error) {
        respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
        errorlog(error)
        // Your code broke (Leave untouched in most cases)
        console.error('an error has occured', error);
        }
  
    }}