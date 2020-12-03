module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	aliases: ['fetch'],
    usage: '[command type | <mod/botmanager/user>] [EXACT command name]',
    hidden:true,
	cooldown: 0,
	mod:true,
	execute(message, args, client) {
		if(!args[0]){
			respond('Reload', 'Please provide the command type (mod/botmanager/user).', message.channel)
		}else if(!args[1]){
			respond('Reload', 'Please provide the command name or alias.', message.channel)
		}
		const modcommandType = args[0].toUpperCase()
		const modcommandName = args[1].toLowerCase()
		const command = message.client.modcommands.get(modcommandName)
			|| message.client.modcommands.find(cmd => cmd.aliases && cmd.aliases.includes(modcommandName));
		
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${modcommandName}\`, ${message.author}!`);
		}
		
		try{
			delete require.cache[require.resolve(`../commands/${modcommandType}_${modcommandName}.js`)]
		}catch(error){
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		}

		try {
			const newCommand = require(`../commands/${modcommandType}_${modcommandName}.js`);
			message.client.modcommands.set(newCommand.name, newCommand);
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${modcommandName}\`:\n\`${error.message}\``);
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			return
		}
		console.log(`The command ${modcommandType}_${modcommandName}.js has been reloaded.`)
		respond('',`Command \`${modcommandName}\` was reloaded!`,message.channel);
	},
};