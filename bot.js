console.log('Starting Up...')
fs = require('fs');
Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.modcommands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const {
	prefix,
	token,
	ModeratorRoleID,
	MemberRoleID,
	UserLog,
	ModLog,
	AssignMemberRoleOnJoin,
} = require('./config.json');
const {
	MessageEmbed
} = require('discord.js')

version = '2.1.3'
codename = 'OpenMod PreAlpha'
footertext = 'Version' + version + '\nCodename: ' + codename

if (!fs.existsSync('./restrictions.json')) {
	console.log('restrictions.json is missing.')
}
if (!fs.existsSync('./logs/userwarnings.json')) {
	fs.writeFileSync('./logs/userwarnings.json', '{}')
}
if (!fs.existsSync('./logs/userMutes.json')) {
	fs.writeFileSync('./logs/userMutes.json', '{}')
}
if (!fs.existsSync('./logs/userNotes.json')) {
	fs.writeFileSync('./logs/userNotes.json', '{}')
}
if (!fs.existsSync('./logs/userKicks.json')) {
	fs.writeFileSync('./logs/userKicks.json', '{}')
}
if (!fs.existsSync('./logs/userBans.json')) {
	fs.writeFileSync('./logs/userBans.json', '{}')
}
if (!fs.existsSync('./logs/prebanlist.json')) {
	fs.writeFileSync('./logs/prebanlist.json', '{}')
}
// Increase number of message listeners
require('events').EventEmitter.defaultMaxListeners = 20;

//Bot ready
client.once('ready', () => {
	console.log('Version ' + version)
	console.log('Codename ' + codename)
	console.log('Ready!');
		if (fs.existsSync(`./statusmessage.config`)) {
	fs.readFile('./statusmessage.config', function (err, data) {
		client.user.setActivity(data.toString(), { type: 'PLAYING' });
		if (err) { errorlog(err) }
	})

}
			
});

//Checks for old configs and informs that it needs to be changed
if (fs.existsSync(`./strings.json`)) {
	console.log('NOTICE: `strings.json` found. This file is no longer used and may be deleted.')
} else { }

respond = function (title, content, sendto, color, footer, imageurl) {
	//Title, Content, Where to send, Embed color, Footer, Image URL
	var RespondEmbed = new Discord.MessageEmbed()
	RespondEmbed.setTitle(title)
	RespondEmbed.setDescription(content)
	if (!sendto || sendto == '') {
		throw 'Missing Arguments.'
	} else {
		if (color && !color == '') {
			RespondEmbed.setColor(color)
		}
		if (footer && !footer == '') {
			RespondEmbed.setFooter(footer)
		}
		if (imageurl && !imageurl == '') {
			RespondEmbed.setImage(imageurl)
		}
		sendto.send(RespondEmbed)
	}

}
modaction = function (RanCommand, RanBy, RanIn, FullCommand) {
	const ModReportEmbed = new Discord.MessageEmbed()
	ModReportEmbed.setColor('#F3ECEC')
	ModReportEmbed.setTitle('Mod Action')
	ModReportEmbed.setDescription(`A moderation action has occurred.`)
	ModReportEmbed.addFields(
		{ name: 'Command', value: `${RanCommand}`, inline: false },
		{ name: 'Executor', value: `${RanBy}`, inline: false },
		{ name: 'Channel', value: `${RanIn}`, inline: false },
		{ name: 'Full message', value: `${FullCommand}`, inline: false }
	)
	ModReportEmbed.setTimestamp()
	const modlogchannel = client.channels.cache.get(`${ModLog}`);
	modlogchannel.send(ModReportEmbed)
}
errorlog = function (error) {
	errorcount = errorcount + 1
	const ErrorReportEmbed = new Discord.MessageEmbed()
	ErrorReportEmbed.setColor('#FF0000')
	ErrorReportEmbed.setTitle('Bot Error')
	ErrorReportEmbed.setDescription(`An error has occurred while the bot was running.`)
	ErrorReportEmbed.addFields(
		{ name: 'Error information', value: `${error}`, inline: false },
	)
	ErrorReportEmbed.setTimestamp()
	const ErrorLog = client.channels.cache.get(`${BotLog}`);
	ErrorLog.send(ErrorReportEmbed)
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const allCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if (!command.mod && !fs.existsSync('./safe_mode.flag')) {
		client.commands.set(command.name, command);
	}
}
for (const file of allCommandFiles) {
	const modcommand = require(`./commands/${file}`);
	if (fs.existsSync('./safe_mode.flag') && modcommand.essential == true) {
		client.modcommands.set(modcommand.name, modcommand);
	} else {
		if (!fs.existsSync('./safe_mode.flag')) {
			client.modcommands.set(modcommand.name, modcommand);
		}
	}

}

//Command list
getCommandList = function (modCheck, userID, showMemberCommands) {
	const findCommandListUser = fs.readdirSync('./commands').filter(file => file.startsWith('USER_'));
	const findCommandListMod = fs.readdirSync('./commands').filter(file => file.startsWith('MOD_'));
	const commandListUser = [];
	const commandListMod = [];
	var commandList = []
	var restrictions = require('./restrictions.json')
	var commandEssential = restrictions[2];
	for (const file of findCommandListUser) {
		const command = require(`./commands/${file}`);
		commandListUser.join(' ')
		if (!command.hidden == true || fs.existsSync('./safe_mode.flag')) {
			if (fs.existsSync('./safe_mode.flag') && commandEssential && commandEssential[command.name] == true) {
				commandListUser.push(command.name)
				console.log(command.name)
			} else {
				if (!fs.existsSync('./safe_mode.flag')) {
					commandListUser.push(command.name)
					console.log(command.name)
				}
			}
		}

	}
	if (modCheck == true) {
		for (const file of findCommandListMod) {
			const command = require(`./commands/${file}`);
			if (!command.hidden == true || fs.existsSync('./safe_mode.flag')) {
				if (fs.existsSync('./safe_mode.flag') && commandEssential && commandEssential[command.name] == true) {
					commandListMod.push(command.name)
					console.log(command.name)
				} else {
					if (!fs.existsSync('./safe_mode.flag')) {
						commandListMod.push(command.name)
						console.log(command.name)
					}
				}
			}
		}
	}

	//Not the best way, but will work on later
	usercommandstring = ['__**    User    **__']
	modcommandstring = ['__**    Mod    **__']
	if (!showMemberCommands == false) {
		commandList.push(usercommandstring)
		commandList.push(commandListUser)
	}

	if (modCheck == true) {
		commandList.push(modcommandstring)
		commandList.push(commandListMod)
	}
	const newcommandlist = commandList.toString().replace(/,/g, '\n')
	return newcommandlist
}



//Commands
client.on('message', async message => {
	if (fs.existsSync('./customCommandHandler.js')) {
		const commandHandler = require('./customCommandHandler.js')
		commandHandler.execute(message, client, prefix)
		console.log('Handed off to custom command handler.')
		return;
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	//Disables commands in DMs
	if (message.channel.type == 'dm')
		return respond('', 'Commands in Direct Messages are disabled.', message.channel);
	else;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.modcommands.get(commandName)
		|| client.modcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	var restrictions = require('./restrictions.json');
	var channelRestrictions = restrictions[0];
	var commandDisabled = restrictions[1];
	var commandEssential = restrictions[2];


	if (!command) {
		return;
	}

	if (fs.existsSync('./safe_mode.flag') && commandEssential && !commandEssential[command.name] == true) {
		if (!command.name.includes('help')) {
			return;
		}
	}
	//Command disabled
	if (commandDisabled[command.name] == true) {
		respond('🛑 Command disabled', `<@${message.author.id}>, the command you are trying to run is disabled at the moment. Please try again later.`, message.channel)
		return;
	}
	//Mod command and no permission
	if (command.mod && !message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)) {
		respond('🛑 Incorrect permissions', `<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel)
		return;
	}
	//Channel not allowed
	if (channelRestrictions[command.name] && !channelRestrictions[command.name].includes(message.channel.id)) {
		respond('🛑 Incorrect permissions', `<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel)
		return;
	}


	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			respond('⏲️', `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, message.channel);
			return;
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	//Normal
	try {
		command.execute(message, args, client, this);
	} catch (error) {
		console.error(error);
		respond('Error', 'Something went wrong.\n' + error, message.channel)

	}


});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection: ', error));

//Member join
client.on('guildMemberAdd', member => {
	var today = new Date();
	var date = today.getMonth() + 1 + '-' + (today.getDate()) + '-' + today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;
	if (!fs.existsSync('./logs/user.log')) {
		fs.appendFileSync('./logs/user.log', `__USER LOG CREATED ${dateTime}__\n\n`)
	}
	fs.readFile('./logs/user.log', function (err, data) {
		if (err) {
			errorlog(err)
			console.error
		}

		const channel = member.guild.channels.cache.find(ch => ch.id === `${UserLog}`);
		const guild = member.guild
		const icon = member.user.displayAvatarURL()
		if (!channel) return;
		if (data.toString().includes(member.id)) {
			const joinedbefore = 'True.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		} else {
			const joinedbefore = 'False.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		}

		fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) joined at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
		function welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore) {
			const MemberJoinEmbed = new Discord.MessageEmbed()
				.setColor('#00FF00')
				.setTitle('Member Join')
				.setThumbnail(`${icon}`)
				.addFields(
					{ name: 'Username', value: member.user.tag, inline: false },
					{ name: 'Member ID', value: member.id, inline: false },
					{ name: 'Account creation date', value: member.user.createdAt, inline: false },
					{ name: 'Joined before?', value: joinedbefore, inline: false },
					{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
				)
				.setTimestamp()
			channel.send(MemberJoinEmbed)
		}


		if (AssignMemberRoleOnJoin == true) {
			const role = member.guild.roles.cache.find(role => role.id === `${MemberRoleID}`);
			member.roles.add(role);
		}
		fs.readFile('./logs/idbanlist.txt', function (err, data) {
			if (err) {
				console.log(err);
				errorlog(err)
				return;
			}
			if (data.toString().includes(member.id)) {
				respond('Banned', 'You were banned from the server. (PREBAN)', member)
				respond('Banned', `${member.tag} was banned from the server. (PREBAN)`, guild.channels.cache.get(UserLog))
				member.ban({ reason: 'Prebanned.' });
			}
		})
	})
});

//Member leave
client.on('guildMemberRemove', member => {
	var today = new Date();
	var date = today.getMonth() + 1 + '-' + (today.getDate()) + '-' + today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;
	const channel = member.guild.channels.cache.find(ch => ch.id === `${UserLog}`);
	const guild = member.guild
	const icon = member.user.displayAvatarURL({ dynamic: true })
	if (!channel) return;
	fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) left at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
	const MemberLeaveEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Member Leave')
		.setThumbnail(`${icon}`)
		.addFields(
			{ name: 'Username', value: member.user.tag, inline: false },
			{ name: 'Member ID', value: member.user.id, inline: false },
			{ name: 'Account creation date', value: member.user.createdAt, inline: false },
			{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
		)
		.setTimestamp()
	channel.send(MemberLeaveEmbed)
});

//Profanity filter
client.on('message', message => {
	//False positive section
	const positive = require('./falsepositive.json');
	var falsePositiveEditedMessage = message.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var fP = positive.filter(word => falsePositiveEditedMessage.toLowerCase().includes(word));
	if(fP.length > 0) {
		var noprofanity = 1
		if(positive == `${positive}`) {
			console.log('Someone swore-- wait never mind, they said '+fP+".")
		}
	}
	if(noprofanity === 1){
		var noprofanity = 0
		return;
	} else if(!noprofanity) {

	//"Oi there's profanity in there" section
	if(message.channel.type == 'dm')return;
	const profanity = require('./profanity.json');
	var editedMessage = message.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var blocked = profanity.filter(word => editedMessage.toLowerCase().includes(word));
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
	var dateTime = date+' '+time;
	if (blocked.length > 0) {
		if(blocked == `${blocked}`)
			console.log(`${message.author.tag} tried to use profanity. Logged word: ${blocked}`);
			message.delete()
			const reason = message.content.replace(/$blocked/g, `**${blocked}**`)
			warnModule = require('./commands/MOD_warn.js')
			warnModule.executeNoCheck(message, 'Profanity. Please watch your language.', `Profanity: ${reason}`, message.author)
			
		const profanityEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Profanity')
		.addFields(
			{ name: 'Author', value: message.author.tag + `\n(${message.author.id})`, inline: true },
			{ name: 'Channel', value: message.channel.name, inline: true },
			{ name: 'Message', value: reason, inline: false },
		)
		.setTimestamp()
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(profanityEmbed)
			//respond('Profanity Filter 🗣️',`Hey <@${message.author.id}>, please watch your language next time. Punishment information was updated on your profile.\nYour message: ${reason}`, message.author)
		}
	}
})

//Log deleted messages
client.on('messageDelete', async message => {
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Let's perform a sanity check here and make sure we got *something*
	if (!deletionLog) {
		console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
		const DeletionEmbed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('Message Deleted')
			.addFields(
				{ name: 'Message sent by', value: message.author.tag, inline: false },
				{ name: 'Deleted by', value: 'Unknown - Audit log not found.', inline: false },
				{ name: 'Sent in', value: message.channel.name, inline: false },
				{ name: 'Message', value: message.content, inline: false },
			)
			.setTimestamp()
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(DeletionEmbed)
	}

	// We now grab the user object of the person who deleted the message
	// Let us also grab the target of this action to double check things
	const { executor, target } = deletionLog;


	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same author's message
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`)
		const DeletionEmbed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('Message Deleted')
			.addFields(
				{ name: 'Message sent by', value: message.author.tag, inline: false },
				{ name: 'Deleted by', value: executor.tag, inline: false },
				{ name: 'Sent in', value: message.channel.name, inline: false },
				{ name: 'Message', value: message.content, inline: false },
			)
			.setTimestamp()
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(DeletionEmbed)
		return;
	} else {
		if (target.id === message.author.id) return;
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`)
		const DeletionEmbed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle('Message Deleted')
			.addFields(
				{ name: 'Message sent by', value: message.author.tag, inline: false },
				{ name: 'Deleted by', value: 'Unknown - Unable to find who deleted message. - May occur when the message author erases their own message', inline: false },
				{ name: 'Sent in', value: message.channel.name, inline: false },
				{ name: 'Message', value: message.content, inline: false },
			)
			.setTimestamp()
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(DeletionEmbed)
		return;
	}
});

//Member update
client.on('guildMemberUpdate', ( oldmember, newmember) => { 
	count = 0

	let oldNickname = oldmember ? oldmember.displayName : null;
	let newNickname = newmember ? newmember.displayName : null;

	const memberUpdateEmbed = new Discord.MessageEmbed()
	memberUpdateEmbed.setAuthor(`${newmember.user.tag}`, `${newmember.user.displayAvatarURL()}`)
	if(oldmember.roles.cache.array().toString() != newmember.roles.cache.array().toString()){
		memberUpdateEmbed.addField('Role Update',`Old roles: ${oldmember.roles.cache.array().toString()}\nUpdated roles: ${newmember.roles.cache.array().toString()}`, false)
		count = count+1
	}
	if(oldNickname != newNickname ){
		memberUpdateEmbed.addField('Nickname Update',`Old nickname: ${oldNickname}\nUpdated nickname: ${newNickname}`, false)
		var profanity = require('./profanity.json');
		var editedMessage = newNickname.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
		var blocked = profanity.filter(word => editedMessage.toLowerCase().includes(word));
		if (blocked.length > 0) {
			newmember.setNickname('User (Renamed by filter)', `Profanity: ${blocked}`)
			respond('📛 Name Change', `Your name was changed since it included profanity. The caught word was: ${blocked}`, newmember)
		}
		count = count+1
	}

	if(count != 0){
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(memberUpdateEmbed)
	}

    
}) 

//message log
client.on('message', message => {
	if (message.channel.type == 'dm') return;
	var today = new Date();
	var date = today.getMonth() + 1 + '-' + (today.getDate()) + '-' + today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;
	const fs = require('fs');
	fs.appendFileSync('./logs/allmessages.log', '\n\nMessage sent by ' + message.author.username + '(' + message.author.id + ') in ' + message.channel.name + '(' + message.channel.id + ')' + '\n\n' + message.content);
	fs.appendFileSync('./logs/' + message.author.id + '-messages.log', '\n\nSent in ' + message.channel.name + '(' + message.channel.id + ')' + '\n\n' + message.content);
	fs.appendFileSync('./logs/allmessages_' + date + '.log', '\n\nMessage sent by ' + message.author.username + '(' + message.author.id + ') in ' + message.channel.name + '(' + message.channel.id + ')' + '\n\n' + message.content);
})

//Message edit
client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.author.bot) return;
	var today = new Date();
	var date = today.getMonth() + 1 + '-' + (today.getDate()) + '-' + today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;
	if (oldMessage === newMessage) return;
	var ref = "http://discordapp.com/channels/" + oldMessage.guild.id + "/" + oldMessage.channel.id + "/" + oldMessage.id;
	const MessageEditEmbed = new Discord.MessageEmbed()
		.setColor('#eea515')
		.setTitle('Message Edit')
		.setDescription('A message edit was detected.')
		.addFields(
			{ name: 'Channel sent: ', value: oldMessage.channel.name, inline: false },
			{ name: 'Message author', value: oldMessage.author.tag, inline: false },
			{ name: 'Old message', value: oldMessage, inline: true },
			{ name: 'Updated message', value: newMessage, inline: true },
			{ name: 'Message link', value: `[Jump](${ref})`, inline: false },

		)
		.setTimestamp()
	const channel = client.channels.cache.get(`${ModLog}`);
	channel.send(MessageEditEmbed);

})
//Login
client.login(token);