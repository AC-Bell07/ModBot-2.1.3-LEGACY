module.exports = {
  name: 'aboutchannel',
  aliases: ['channelabout', 'channelinfo', 'infochannel'],
  description: 'Gets information about the mentioned channel.',
  usage: '<channel>',
  cooldown: 0,
	execute(message, args, client) {
    const fs = require('fs');
    try {
      if(!message.mentions.channels.first()){respond('Error', 'Please mention a channel.', message.channel);return}else{
      const member = client.user
      const name = message.mentions.channels.first().name
      const channel =  message.mentions.channels.first()
        const ChannelInfoEmbed = new Discord.MessageEmbed()
      ChannelInfoEmbed.setTitle('About #'+ name )
      if(channel.name != ''){
        ChannelInfoEmbed.addField('Channel name', name, false)
      }
      if(!channel.topic == ''){
        ChannelInfoEmbed.addField('Channel topic', channel.topic, false)
      }
      if(channel.createdAt != 'undefined'){
        ChannelInfoEmbed.addField('Channel creation date', channel.createdAt, false)
      }
      message.channel.send(ChannelInfoEmbed)
      }
      
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
  }}