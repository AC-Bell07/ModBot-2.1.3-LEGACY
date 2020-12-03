module.exports = {
    name: 'goodbye',
    aliases: ['bye'],
    description: 'Says goodbye. What else would it do? :joy:',
    usage: 'N/A',
    cooldown: 0,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const info = require('../config.json')
      const fs = require('fs');
      try {
        const reason = args.join(' ')
      if (message.author.id === info.AveryID) {
      respond('','Goodbye, <@'+ message.author.id+'>! :wave: I hope to see my tester again! 🙂\nRemember, say hi to Elijah for me!',message.channel);
      }else if (message.author.id === info.ElijahID) {
      respond('','Goodbye, <@'+ message.author.id+">! :wave: I hope to see my Owner again! 🙂\n*please fix me please fix me I don't want to be broken*",message.channel);
      }else if (message.member.roles.cache.some(role => role.id === info.ModeratorRoleID)) {
      respond('','Goodbye, <@'+ message.author.id+'>! :wave: I hope to see you moderators again! 🙂',message.channel);
      }else{respond('','Goodbye, <@'+ message.author.id+'>! :wave: I hope to see you again!', message.channel);}
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }}