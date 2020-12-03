module.exports = {
    name: 'pollassist',
    aliases: ['poll', 'poll'],
    description: 'List of poll answers.',
    cooldown: 5,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      try {
      respond('',`**Poll Rating System Options**\nOpt 1: God Tier\nOpt 2: Amazing\nOpt 3: Great\nOpt 4: Good\nOpt 5: Okay\nOpt 6: Meh\nOpt 7:Bad\nOpt 8: Complete and Utter Dogshit`,message.channel)
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}
  //