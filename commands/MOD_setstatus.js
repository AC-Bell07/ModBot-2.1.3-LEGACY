module.exports = {
  name: 'setstatus',
  aliases: ['statusset'],
  description: 'Sets status to `Playing` <text>',
  usage: '<text>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const user = client.user
    const statuscontent = args.join(' ')
    try {
      const activity = args.join(' ')
      user.setActivity(activity, { type: 'PLAYING' });
      fs.writeFileSync('./statusmessage.config', activity, 'utf-8');
      respond('','Bot activity set to `PLAYING '+activity+'`.', message.channel)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
		  
  }}