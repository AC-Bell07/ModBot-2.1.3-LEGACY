module.exports = {
	name: 'delete',
	aliases: ['erase'],
	description: 'Deletes something from User Log.',
	usage: '<user> <entry #> <note/warn/mute/kick/ban>',
	cooldown: 0,
	mod:true,
	  execute(message, args, client) {
		  config = require('../config.json')
		  mentionedUser = message.mentions.members.first()
		  if(!mentionedUser)
			  return respond('', `User mention not found.\nCorrect usage of this command is: ${config.prefix+this.name} ${this.usage}`, message.channel)
		  if(!args[1])
			  return respond('', `Please provide the entry number to remove.\nCorrect usage of this command is: ${config.prefix+this.name} ${this.usage}`, message.channel)
		  if(!args[2])
			  return respond('', `Please provide which log to remove entry from.\nCorrect usage of this command is: ${config.prefix+this.name} ${this.usage}`, message.channel)
		  if(!["note", "warn", "mute", "kick", "ban"].includes(args[2]))
			  return respond('', `Invalid User Log type given.\nCorrect usage of this command is: ${config.prefix+this.name} ${this.usage}`, message.channel)
		  try{
  
			  EntryNumber = args[1]-1;
			  operationName = args[2].replace(args[2].slice(0,1), args[2].charAt(0).toUpperCase())
  
			  // Delete warnings
			  if(operationName == 'Warn')
				  var userLog = require(`../logs/userwarnings.json`)
			  else
				  var userLog = require(`../logs/user${operationName}s.json`)
			  
			  if (!userLog[mentionedUser.id])
				  return respond('',`Unable to find ${operationName.toLowerCase()}s for this user.`, message.channel);
	  
	  
			  if (!userLog[mentionedUser.id][EntryNumber])
				  return respond('',`${operationName} ${EntryNumber} doesn't exist.`, message.channel)
	  
	  
			  userLog[mentionedUser.id].splice(EntryNumber, 1); // remove the entry
  
			  if(operationName == 'Warn')
				  fs.writeFile('./logs/userwarnings.json', JSON.stringify(userLog), (err) => {
					  if (err) {
						  console.log(err);
						  return	respond('',`An error occured during saving.`, message.channel);
					  }
				  })
			  else
				  fs.writeFile(`./logs/user${operationName}.json`, JSON.stringify(userLog), (err) => {
					  if (err) {
						  console.log(err);
						  return	respond('',`An error occured during saving.`, message.channel);
					  }
				  })
	  
			  respond('',`${operationName} ${EntryNumber+1} was removed.`, message.channel);
			  if(operationName == 'Warn')
				  delete require.cache[require.resolve(`../logs/userwarnings.json`)]
			  else
					  delete require.cache[require.resolve(`../logs/user${operationName}.json`)]
		  }catch(err){
			  errorlog(err)
		  }
	  }
  }