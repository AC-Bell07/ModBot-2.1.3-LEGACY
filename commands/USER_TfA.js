module.exports = {
    name: 'twitter',
    aliases: ['android', 'tfa'],
    description: 'Twitter for Android.',
    cooldown: 5,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      try {
      respond('',`He posts the same thing\nDay after day (twitter for android)\nWhat’s he trying to prove\nWhat’s he wanna say? (wooh)\nIt was funny for a minute\nNow it’s getting old\nWhat’s the point of it all\nTwitter\nTwitter for android\nTwitter for androooooooooooooid\nTwitter\nTwitter for android\nTwitter for androooooooooooooid\nWell there’s never and ever and ever enough time\nIt’s fleeting\nIt’s leaving\nI don’t have enough time\nThe weeks\nTurn to days\nTurn to hours\nTurn to moments\nYou gotta play the hand you’re given\nAnd make it WEEEEEEIIIIIIIRRRRRRD`,message.channel)
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}
  //