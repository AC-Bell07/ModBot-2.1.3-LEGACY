const { prefix } = require('../config.json');

module.exports = {
	name: 'kick',
	description: 'Kicks a user from the server.',
	aliases: ['boot'],
	usage: '<user>',
	cooldown: 0,
	mod:true,
	execute(message, args, client) {
		const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
		try {
			if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
			const {ModeratorRoleID} = require('../config.json');
			const checkmemberforroles = message.mentions.members.first()
			if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
			// Code hopefully works
			const user = message.mentions.members.first()
			const reason = args.join(' ')
			const auditreason = reason.replace(argarray[1], '')
			fs.appendFileSync('./logs/' + user.id + '-warnings.log', 'Kick\nReason: ' + auditreason +'\n\n');
			fs.appendFileSync('./logs/' + user.id + '-modwarnings.log', 'Kick issued by '+ message.author.tag +'\nReason: ' + auditreason +'\n\n');
			respond('⬅️ Kick','<@'+user.id+'> was kicked from the server.\nReason: '+auditreason, message.channel)
			respond('⬅️ Kick','You have been kicked from the server. You may rejoin at anytime.\n\nReason for kick: '+auditreason, user)
			modaction(this.name, message.author.tag, message.channel.name, message.content)
			message.mentions.members.first().kick({reason: `${message.author.tag} | ${auditreason}`})
		}catch(error) {
			respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}
		
}
};