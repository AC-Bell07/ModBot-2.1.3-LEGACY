module.exports = {
	name: 'shutdown',
	aliases: ['turnoff', 'forceoff', 'off'],
	description: 'Shuts Down Nexus.',
	mod:true,
	execute(message, args, client) {
		try{
		const fs = require('fs');
		const { MessageEmbed } = require('discord.js')
		const RestartedEmbed = new Discord.MessageEmbed()
		RestartedEmbed.setTitle('✅ Shutdown')
		RestartedEmbed.setDescription('ModBot has been shutdown.')
		message.channel.send(RestartedEmbed)
		setTimeout(function(){ 
			process.exit()
		}, 2000);
	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
	}
	
};