module.exports = {
  name: 'hide',
  aliases: ['hidechannel', 'invisible'],
  description: 'Hides the channel the command is ran in.',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
	const channel = message.channel
    try {
		channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
		respond('','<#'+message.channel+'> was hidden.',message.channel)
		modaction(this.name, message.author.tag, message.channel.name, message.content)
	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
		  
  }}