module.exports = {
    name: 'preban',
    description: 'Bans a user by ID when they join the server.',
	usage: '<user id> <reason>',
	cooldown: 0,
	mod:true,
    execute(message, args, client) {
		const {prefix} = require('../config.json')
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		const fs = require('fs')
        try {
			if(message.mentions.members.first()){
				respond('',`Please use the \`ban\` command instead.`, message.channel);
				return;
			}

			const idToBan = argarray[1]
			if (message.author.id == idToBan){
				respond('',`You can't perform this action on yourself.`, message.channel);
				return;
			}
			const {ModeratorRoleID} = require('../config.json');
			if(message.guild.members.cache.get(idToBan)){
				const checkmemberforroles = message.guild.members.cache.get(idToBan)

			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){
				respond('',`You can't perform that action on this user.`, message.channel);
				return;
			}
			}
			
				prebanList = require('../logs/prebanlist.json')
				if(prebanList[idToBan]){
					respond('Error', 'User is already on the pre-ban list.', message.channel)
					return;
				}else{
					const userid = argarray[1]
					const authorusername = message.author.username +'#' +message.author.discriminator
					let reasonraw = args.join(' ')
					var reason = reasonraw.replace(`${argarray[1]}`, '');
					if(reason == ''){
						var reason = 'No reason provided.'
					}
					prebanList[idToBan] = reason
					fs.writeFileSync('./logs/prebanlist.json', JSON.stringify(prebanList))
					respond('Ban',argarray[1]+' was banned.\nReason: '+reason, message.channel)
					modaction(this.name, message.author.tag, message.channel.name, message.content)
				}
			
			
        	}catch(error) {
				respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
				errorlog(error)
				// Your code broke (Leave untouched in most cases)
				console.error('an error has occured', error);
				}
    },
};