const tmi = require('tmi.js');
require('dotenv').config();

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true
  },
  options: {
    debug: true
  },
  channels: [
    'doubleslash_dev'
  ],
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  }
});

client.connect().catch(console.error);

const commands = {
  website: {
    response: 'https://www.double-slash.dev'
  },
  podcast: {
    response: 'https://www.double-slash.dev'
  },
  twitter: {
    response: '@doubleslash_dev - https://twitter.com/doubleslash_dev'
  },
  youtube: {
    response: 'https://www.youtube.com/channel/UCp5DGBAX2XNJXeOVAo7bICQ'
  },
  command: {
    response: () => { return `Toutes les commandes disponibles:     ${Object.keys(commands).toString()}`}
  },
  discord: {
    response: 'discord.gg/6JUFtezW'
  },
  about: {
    response: "Double Slash est a l'origine un podcast sur le DEV WEB moderne, mais c'est devenu bien plus avec Twitch, Youtube ...."
  },
  github: {
    response: 'https://github.com/double-slash-podcast'
  },
  sponsor: {
    response: 'https://github.com/sponsors/double-slash-podcast'
  },
  cal: {
    response: `GoogleCalendar:   https://www.google.com/calendar/render?cid=webcal://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=577092272 
    iCal/Outlook... webcal://api.twitch.tv/helix/schedule/icalendar?broadcaster_id=577092272: 
    `
  },
  stack: {
    response: 'NuxtJS - PlopJS'
  },
  project: {
    response: "On créer un générateur de template pour faciliter l'intégration de nouvel épisode"
  },
  // XXXXXXXX: {
  //   response: 'XXXX'
  // },
}

client.on('message', async (channel, context, message,self) => {

  if (self) return;

  const [raw, command, argument] = message.match(regexpCommand)

  const { response } = commands[command] || client.say(channel, "command => 404 ");

  if (typeof response === 'function') {
    client.say(channel, response(argument));

  } else if (typeof response === 'string') {
    client.say(channel, response);
  }
});

