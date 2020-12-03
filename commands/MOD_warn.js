module.exports = {
  name: 'warn',
  aliases: ['punish'],
  description: 'Logs a warning.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
  nodelay:true,
	execute(message, args, client) {
    //Prepares required
    const config = require('../config.json')
    userwarnings = require('../logs/userwarnings.json')
    var reason = args.join(' ').replace(args[0], '')
    const mentionedUser = message.mentions.members.first()
    try {
      if(!mentionedUser){
        respond('', 'No user mention was found.', message.channel)
        return;
      }
      //Permissions check
      if (message.author.id == message.mentions.members.first().id){
        respond('',`You can't perform this action on yourself.`, message.channel);
        return;
      }
			if (message.mentions.members.first().roles.cache.some(role => role.id === config.ModeratorRoleID)){
        respond('',`You can't perform that action on this user.`, message.channel);
        return;
      }
      if (!args[1]){
        respond('',`Please provide a reason.`, message.channel);
        return;
      }

      //Writes reason to JSON

      if (!userwarnings[mentionedUser.id])
			  userwarnings[mentionedUser.id] = [];

		  userwarnings[mentionedUser.id].push(reason);

		fs.writeFile('./logs/userwarnings.json', JSON.stringify(userwarnings), (err) => {
			if (err) {
				console.log(err);
				respond('',`An error occured during saving.`, message.channel);
				return;
      }
    })
      
      //Notifies of the warn
      respond('⚠️ Warn','<@'+message.mentions.members.first() + '> was warned. User has '+userwarnings[mentionedUser.id].length+' warnings.\nReason: '+reason, message.channel)
      const warnedperson = message.mentions.users.first()
      const user = client.users.cache.get(warnedperson);
      respond('⚠️','You have been warned due to: '+ reason+'\n\nThis is warning '+userwarnings[mentionedUser.id].length+'.', warnedperson)
      
      //Mod action event
      modaction(this.name, message.author.tag, message.channel.name, message.content, message)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    
  },
  executeNoCheck(message, publicReason, privateReason, whoToWarn){
    const config = require('../config.json')
    userwarnings = require('../logs/userwarnings.json')
    const warnedperson = whoToWarn
          //Writes reason to JSON

          if (!userwarnings[warnedperson.id])
          userwarnings[warnedperson.id] = [];
  
        userwarnings[warnedperson.id].push(privateReason);
  
      fs.writeFile('./logs/userwarnings.json', JSON.stringify(userwarnings), (err) => {
        if (err) {
          console.log(err);
          respond('',`An error occured during saving.`, message.channel);
          return;
        }
      })
        
        //Notifies of the warn
        respond('⚠️','<@'+warnedperson.id + '> was warned. User has '+userwarnings[warnedperson.id].length+' warnings.\nReason: '+publicReason, message.channel)
        respond('⚠️','You have been warned due to: '+ publicReason+'\n\nThis is warning '+userwarnings[warnedperson.id].length+'.', warnedperson)
        
        //Mod action event
        modaction(this.name, 'AutomaticModeration', message.channel.name, `Auto.\nPublic reason: ${publicReason}\nPrivate reason: ${privateReason}`)
  }
}