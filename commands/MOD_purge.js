module.exports = {
    name: 'purge',
    description: 'Purges messages at once.',
    aliases: ['clear'],
	usage: '<amount>',
	cooldown: 0,
	mod:true,
	nodelay:true,
    execute(message, args, client) {
		const { StaffRoleID, ModLog, BotLog , CrashNotify } = require('../config.json');
        try {
			const { prefix } = require('../config.json');
			const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
			const preamount = argarray[1]
			const amount = Number(`${preamount}`)
			console.log(preamount)
			try{
				if(!argarray[1]){
					respond('', 'Invalid arguments.', message.channel);
					return;
				}
				message.channel.bulkDelete(amount+1)
				modaction(this.name, message.author.tag, message.channel.name, message.content)
				return //Broken
				console.log(argarray[2])
				if(amount >= 70 && argarray[2] && argarray[2].includes('-override')){
					console.log('Allowed purge.')
					message.channel.bulkDelete(amount+1)
					modaction(this.name, message.author.tag, message.channel.name, message.content)
				}else{
					console.log('Declined purge.')
					respond('❗', `You are attempting to purge a large amount of messages (${amount}). Please add\`-override\` at the end of the message to allow.`, message.channel)
					return;
				}
				
			}catch(error){
				console.log(error)
					respond('❗', `You can only purge up to 100 messages at a time.`, message.channel);return;
						}
					}catch(error) {
						respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
						errorlog(error)
						// Your code broke (Leave untouched in most cases)
						console.error('an error has occured', error);
						}
    },
};