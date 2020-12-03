module.exports = {
    name: 'eeeee',
    aliases: ['e'],
    description: 'EEEEEEEEEEEEEEEEEEEEEEEEEE',
    cooldown: 2,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      try {
      respond('',`eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`,message.channel)
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}
  //