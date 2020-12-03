module.exports = {
  name: 'unlock',
  aliases: ['unlockout'],
  description: 'Unlocks the channel the command is ran in.',
  usage: '',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
	const fs = require('fs');
	const channel = message.channel
	const reason = args.join(' ')
    try {
		channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });
		if(args != ''){respond('🔓', `<#${message.channel.id}> was unlocked.\nReason: `+reason, message.channel)}
		else{respond('🔓', `<#${message.channel.id}> was unlocked.`, message.channel)}
		modaction(this.name, message.author.tag, message.channel.name, message.content)
	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
		  
  }}