module.exports = {
  name: 'hi',
  aliases: ['hello', 'hey'],
  description: 'Says hello. What else would it do? :joy:',
  usage: 'N/A',
  cooldown: 0,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const info = require('../config.json')
    const fs = require('fs');
    const argarray = message.content.slice().trim().split(/ +/g);
    try {
      const reason = args.join(' ')
    if (message.author.id === info.AveryID) {
    respond('','Hello, <@'+ message.author.id+'>! :wave: Nice to see my guy that tests stuff for me! 🙂\nSay hi to Elijah for me, will you? Thanks in advance!',message.channel);
    }else if (message.author.id === info.ElijahID) {
    respond('','Hello, <@'+ message.author.id+'>! :wave: Nice to see my Owner! 🙂\nHave you fixed me like you promised?',message.channel);
    }else if (message.member.roles.cache.some(role => role.id === info.ModeratorRoleID)) {
    respond('','Hello, <@'+ message.author.id+'>! :wave: Nice to see one of the moderators! 🙂',message.channel);
    }else{respond('','Hello, <@'+ message.author.id+'>! :wave:', message.channel);}
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}