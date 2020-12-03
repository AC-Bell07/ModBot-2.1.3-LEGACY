module.exports = {
    name: 'note',
    description: 'Logs a note.',
    usage: '<user> <note>',
    cooldown: 0,
    mod:true,
    nodelay:true,
      execute(message, args, client) {
      //Prepares required
      const config = require('../config.json')
      userNotes = require('../logs/userNotes.json') || {}
      var reason = args.join(' ').replace(args[0], '')
      const mentionedUser = message.mentions.members.first()
      try {
        if(!mentionedUser){
          respond('', 'User mention was not found.', message.channel)
          return
        }
        if (!args[1]){
          respond('',`Please provide text you want to note.`, message.channel);
          return;
        }
        //Writes reason to JSON
  
        if (!userNotes[mentionedUser.id])
                userNotes[mentionedUser.id] = [];
  
            userNotes[mentionedUser.id].push(reason);
  
          fs.writeFile('./logs/userNotes.json', JSON.stringify(userNotes), (err) => {
              if (err) {
                  console.log(err);
                  respond('',`An error occured during saving.`, message.channel);
                  return;
        }
      })
        
        //Notifies of the note
        respond('📝 Note','<@'+message.mentions.members.first() + `> had a note logged. User has ${userNotes[mentionedUser.id].length} notes.`, message.channel)
        
        //Mod action event
        modaction(this.name, message.author.tag, message.channel.name, message.content, message)
      }catch(error) {
        respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
        errorlog(error)
        // Your code broke (Leave untouched in most cases)
        console.error('an error has occured', error);
        }
      
    },
    executeNoCheck(message, publicReason, privateReason, whoTonote){
      const config = require('../config.json')
      userNotes = require('../logs/userNotes.json')
      const noteedperson = whoTonote
            //Writes reason to JSON
  
            if (!userNotes[noteedperson.id])
            userNotes[noteedperson.id] = [];
    
          userNotes[noteedperson.id].push(privateReason);
    
        fs.writeFile('./logs/userNotes.json', JSON.stringify(userNotes), (err) => {
          if (err) {
            console.log(err);
            respond('',`An error occured during saving.`, message.channel);
            return;
          }
        })
          
          //Notifies of the note
          respond('📝 Note','<@'+message.mentions.members.first() + `> had a note logged. User has ${userNotes[mentionedUser.id].length} notes.`, message.channel)
          
          //Mod action event
          modaction(this.name, 'AutomaticModeration', message.channel.name, `Auto.\nPublic reason: ${publicReason}\nPrivate reason: ${privateReason}`, message)
    }
  }