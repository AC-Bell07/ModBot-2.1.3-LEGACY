module.exports = {
	name: 'clear',
	description: 'Clears all entries from a User Log.',
	usage: '<user> <note/warn/mute/kick/ban>',
	cooldown: 0,
	mod:true,
	  execute(message, args, client) {
		  config = require('../config.json')
		  mentionedUser = message.mentions.members.first()
		  if(!mentionedUser)
			  return respond('', `User mention not found.\nCorrect usage of this command is: ${config.prefix+this.name} ${this.usage}`, message.channel)
		  if(!args[1])
			  return respond('', `Please provide which log to clear.\nCorrect usage of this command is: ${config.prefix+this.name} ${this.usage}`, message.channel)
		  if(!["note", "warn", "mute", "kick", "ban"].includes(args[1]))
			  return respond('', `Invalid User Log type given.\nCorrect usage of this command is: ${config.prefix+this.name} ${this.usage}`, message.channel)
		  try{
  
			  EntryNumber = args[1]-1;
			  operationName = args[1].replace(args[1].slice(0,1), args[1].charAt(0).toUpperCase())
  
			  // Delete warnings
			  if(operationName == 'Warn')
				  var userLog = require(`../logs/userwarnings.json`)
			  else
				  var userLog = require(`../logs/user${operationName}s.json`)
			  
			  if (!userLog[mentionedUser.id])
				  return respond('',`Unable to find ${operationName.toLowerCase()}s for this user.`, message.channel);
	  
	  
	  
			  delete userLog[mentionedUser.id]
  
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
	  
			  respond('',`All ${operationName.toLowerCase()}s were removed.`, message.channel);
			  if(operationName == 'Warn')
				  delete require.cache[require.resolve(`../logs/userwarnings.json`)]
			  else
					  delete require.cache[require.resolve(`../logs/user${operationName}.json`)]
		  }catch(err){
			  errorlog(err)
		  }
	  }
  }