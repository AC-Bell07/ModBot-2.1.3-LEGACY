module.exports = {
    name: 'decrypt',
    aliases: ['dec', 'crackcode'],
    description: '**This is a game command.**\nFound the real meaning? Use this command to guess!\n(Make sure you run .cryptogram to get an encrypted message.)',
    usage: '(Cryptogram ID) (answer in one word) | .decrypt 5 HELLOWORLDHOWAREYOUDOING',
    cooldown: 0,
    hidden:true,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      //Pick a cryptogram
      const crypto = require('./crypt.json');
      const arg = message.content.slice('').trim().split(/ +/g);
      console.log(arg[1])
      var modified = arg[1] - 1
      const item = crypto[modified];
      console.log(item)
      console.log(item.decrypted)
      console.log(arg[2])
      if(item === 'undefined')  {
        respond('Invalid Cryptogram ID','Please make sure you entered a valid Cryptogram ID.',message.channel)
        return
      }
        if(arg[2] === item.decryptedcase){
          fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
            if(error) {
              console.log("answer correct, capital letter. no leaderboard update.")
              respond('Correct!',"c0n6ra7ul4710n5 h4ck3r, y0u g07 17 r16h7! m4k3 5ur3 t0 u53 4ll 5m4ll l3773r5, 7h0u6h.\n(Congratulations hacker, you got it right! Make sure you use all small letters, though.)\nIf you want to compete in the leaderboards, type `leaderboard init`.", message.channel, '29BF00', `QID: ${item.qid}`)
              message.delete()
              return
            } else {
            console.log('answer correct, capital letter')
            jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
            jsonfile.cryptwins = Number(jsonfile.cryptwins)+1;
            data = JSON.stringify(jsonfile)
            fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
                if (err) throw err;
                else {
                  console.log("Successfully updated Cryptogram game stats of " + message.author.id + ".")
                }
            })
          }
        })
          message.delete()
        console.log("answer correct, capital letters")
        respond('Correct!',"c0n6ra7ul4710n5 h4ck3r, y0u g07 17 r16h7! m4k3 5ur3 t0 u53 4ll 5m4ll l3773r5, 7h0u6h.\n(Congratulations hacker, you got it right! Make sure you use all small letters, though.)", message.channel) 
        return
      } else if(arg[2] === item.decrypted){
        message.delete()
        fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
          if(error) {
            console.log("answer correct. no leaderboard update.")
            respond('Correct!',"c0n6ra7ul4710n5 h4ck3r, y0u g07 17 r16h7!\n(Congratulations hacker, you got it right!)\nIf you want to compete in the leaderboards, type `leaderboard init`.", message.channel, '29BF00', `QID: ${item.qid}`)
            message.delete()
            return
          } else {
          console.log('answer correct')
          jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
          jsonfile.cryptwins = Number(jsonfile.cryptwins)+1;
          data = JSON.stringify(jsonfile)
          fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
              if (err) throw err;
              else {
                console.log("Successfully updated Cryptogram game stats of " + message.author.id + ".")
              }
          })
        }
      })
        respond('Correct!',"c0n6ra7ul4710n5 h4ck3r, y0u g07 17 r16h7!\n(Congratulations hacker, you got it right!)", message.channel) 
        return
      } else {
        message.delete()
        fs.readFile('./leaderboards/' + message.author.id + '_gamestats.json', error => {
          if(error) {
            console.log("answer wrong. no leaderboard update.")
            respond('Wrong!',"7h47 15 wr0n6, m8!\n(That is wrong, mate!)\nIf you want to compete in the leaderboards, type `leaderboard init`.", message.channel, '29BF00', `QID: ${item.qid}`)
            message.delete()
            return
          } else {
          console.log('answer wrong')
          jsonfile = require('../leaderboards/' + message.author.id + '_gamestats.json');
          jsonfile.cryptlosses = Number(jsonfile.cryptlosses)+1;
          data = JSON.stringify(jsonfile)
          fs.writeFile('./leaderboards/' + message.author.id + '_gamestats.json', data, (err) => {
              if (err) throw err;
              else {
                console.log("Successfully updated Cryptogram game stats of " + message.author.id + ".")
              }
          })
        }
      })
          respond('Wrong!',"7h47 15 wr0n6, m8!\n(That is wrong, mate!)", message.channel) 
          return
      }
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }