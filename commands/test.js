module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send(`${message.author}, My current ping is ${message.client.ws.ping}ms`);
	},
};