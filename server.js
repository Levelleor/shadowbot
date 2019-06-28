// set up ======================================================================
// get all the tools we need
const fs                = require('fs');
const Discord           = require('discord.js');

var Players = require('./app/modules/players.js');
var LABYRINTH = require('./app/modules/LABYRINTH.js');

const { prefix, token } = require('./config/config.json');

// configuration ===============================================================
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');

const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

var active_channels = [
  "499278926959345669"
];

var players = new Players();

async function play(usr, mods) {
  try {
    //and the game begins
    let player = players.get(usr.id);
    let pos = player.position;

    let location = LABYRINTH[pos[0]][pos[1]];

    //jumpscares
    if (location.hasOwnProperty('scare')) {
      if (player.scares.indexOf(location.scare.name) === -1) {
        let response = await usr.send(location.scare.text, {
          files: [
            { attachment: "./assets/img/dungeon/jumpscares/" + location.scare.img, name: location.scare.text }
          ]
        });
        player.scared(location.scare.name);
        await response.delete(3500);
      }
    }

    let actions = "";

    //lookaround
    actions += ' - \`lookaround\`\n';

    //move
    if (location.hasOwnProperty('directions')) {
      location.directions.forEach(d => {
        //if it is not locked
        if (typeof d.locked === 'undefined') {
          actions += ' - \`move ' + d.name + '\`\n';
        }
        //if it is locked we check if player can proceed
        else {
          if (d.locked === 'equipment') {
            if (d.requires.every(elem => player.equipment.indexOf(elem) > -1)) {
              //all items aquired, player allowed to proceed
              actions += ' - \`move ' + d.name + '\`\n';
            } //otherwise player does not have all nesessary items
          }
          if (d.locked === 'action') {
            if (d.requires.every(elem => player.actions.indexOf(elem) > -1)) {
              //all actions done, player allowed to proceed
              actions += ' - \`move ' + d.name + '\`\n';
            } //otherwise player did not go through all nesessary actions
          }
        }
      });
    }

    //interact
    if (location.hasOwnProperty('interactions')) {
      location.interactions.forEach(i => {
        actions += ' - \`interact ' + i.item + '\`\n';
      });
    }

    //use
    actions += ' - \`use [item name]\`\n';

    //status
    actions += ' - \`status\`\n';

    let image;
    if (location.hasOwnProperty('img')) {
      image = "./assets/img/dungeon/" + location.img;
    }
    
    let embed = {
      "title": "⚔ Labyrinth",
      "description": location.description,
      "color": 16751104,
      "footer": {
        "text": "Sometimes for an unknown reason Discord delays sending messages (even though the server has done all the needed calculations for the game). Please, be patient if a new location screen is loading for too long. Thank you!"
      },
      "image": {
        "url": "attachment://image.jpg"
      },
      "fields": [
        {
          "name": "🥖 Available actions",
          "value": actions
        }
      ]
    };

    if (typeof mods === 'object') {
      mods.forEach(m => {
        embed.fields.unshift(m);
      });
    }

    client.users.get(usr.id).send({embed, files: [
      { attachment: image, name: 'image.jpg' }
    ]});
  } catch(e) {console.error(e)}
}

// launch ======================================================================
client.on('ready', () => {
  //client.user.setUsername('Ancient Guardian');
  //client.user.setAvatar('./assets/img/botavatars/shadow.jpg');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message=> {
  (async function() {
    if (message.author.bot === true) return;

    //if (message.channel.id !== "499278926959345669") return;

    if (message.isMentioned(client.user)) {
      var player = players.get(message.author.id);
      if (player === undefined || player.length == 0)  {
        //tell everyone that someone's accepted the challenge
        message.channel.send(`${message.author.username} feels something is happening... The body... It is dissapearing. You don't see your arms anymore. Everything happened so fast, you couldn't even make a sound. ${message.author.username} just was here, not anymore...`);
        //active_channels.forEach((el) => {
        //  client.channels.get(el).send('Someone accepted the challenge. The price of not finishing it is players soul. Be careful in your decisions, there is no way back.');
        //});
        //add player to the game
        player = players.add(message.author.id);
        play(message.author);
      } else {
        message.author.send('Your game is already running. You can continue it anytime!');
      }

    }
  })();
});

client.on('message', message => {
  //If the message either doesn't start with the prefix or was sent by a bot, exit early.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  } else if (command.dmOnly && message.channel.type !== 'dm') {
    return message.reply('This command is only available in DMs!');
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  //if not admin set cooldown
  if(message.author.id != 115961932598476800) {

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    else {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }

      if(message.author.id != 115961932598476800) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
    }

  }

  try {

    let mods = command.execute(message, args, players);
    play(message.author, mods);
    
  }
  catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }

});

client.login(token);