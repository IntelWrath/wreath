const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config/config.json');
require('dotenv').config()
const cooldowns = new Discord.Collection();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Im locked in quaratine`);
    client.user.setActivity(`-help | -invite | -support`, { type: "LISTENING" });
});

client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
        if (!command) return;
    if (command.args && !args.length) {
            let reply = `You didnt provide any arguments, ${message.author}!`;
        
            if (command.usage) {
            reply += `\n The proper usage would be: \`${prefix}${command.name} ${command.usage}`;
            }
    
                return message.channel.send(reply);
            }


    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`Command Failure, Error Code: #4859`);
    }
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
    }
});


client.login(process.env.TOKEN);