module.exports = {
  name: 'ping',
  aliases: ['ping'],
  description: 'Checks ping between Discord and host.',
  usage: '',
  cooldown: 0,
	execute(message, args, client) {
    try{
    message.channel.send('Pinging...').then(sent => {
      sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`).then(results => results.delete()).then(results => {
        const result = results
        respond('', `Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`, message.channel)
      })
  })
}catch(error) {
  respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
  errorlog(error)
  // Your code broke (Leave untouched in most cases)
  console.error('an error has occured', error);
  }}
}