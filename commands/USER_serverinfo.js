module.exports = {
  name: 'serverinfo',
  aliases: ['infoserver', 'aboutserver', 'serverabout'],
  description: 'Gets information about the server.',
  usage: '',
  cooldown: 0,
	execute(message, args, client) {
    const fs = require('fs');
    try {
      const member = client.user
      const icon = message.guild.iconURL({ dynamic: true })
      const name = message.guild.name
      const guild = message.guild
      const ServerInfoEmbed = new Discord.MessageEmbed()
      .setTitle('About '+ name )
      .addFields(
        { name: 'Guild owner', value: `<@${guild.owner.id}>`, inline:false},
        { name: 'Guild member count', value: guild.memberCount, inline: false },
        { name: 'Guild creation date', value: guild.createdAt, inline: false },
        { name: 'Guild roles', value: guild.roles.cache.array().toString(), inline: false },
        
			)
      .setThumbnail(`${icon}`)
      message.channel.send(ServerInfoEmbed)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
  }}