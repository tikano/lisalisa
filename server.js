const Discord = require('discord.js');
const token = "NjkzNTQwOTY0NjY4ODAxMTgz.XpPHVw.ejmMutg_w8mrXWQyDHqDs0iIo-c";
const client = new Discord.Client();

//var snowflak = 693240367058911252;
var snowflak = 993240367058911252;

var looping = false;




async function ServerloopUser(size, guild, user){
    var usercount = 0;
    var channelList = guild.channels.cache.array();
    for(channel of channelList){
        if(channel.type == "text"){
            var x = 0;
            x = await loop(100, channel, user, 0);
            usercount = usercount + x;
        }
    }
    return usercount;
}

async function loop(size, channel, user, count){
    var size1 = size;
    if(size1 == 0){
        snowflak = 993240367058911252;
        return count;
    }
        

    await channel.messages.fetch({ limit: size, before: snowflak}).then(messages => {
        size1 = messages.size;
        messages.each(message => {
          if(message.content.length >= 5){
            message.member.messageArray.push(message.id);
          }
          count++;    
          snowflak = message.id;
        })
    }).catch(console.error);
    console.log(count + "here");
         
    await loop(size1, channel, user, count).then(usecount => {
        count = usecount;
    });
    return count;
}

function generateRandomMessage(user){
  var total = user.messageArray.length;
  var randIndex = Math.floor(Math.random() * total);
  return user.messageArray[randIndex];
}


client.on('message', async message => {
    if (message.author.bot) return;
    message.member.messageCount++;
    
    if(message.content.startsWith('initialize lisa lisa') && message.author.username == "jikat2"){
      looping = true;
      var allUsers = message.guild.members.cache.array();
      for(user of allUsers){
        user.messageArray = [];
      }
      ServerloopUser(100, message.guild, message.author).then(usercount => {console.log(usercount)});
        console.log('done');
      looping = false;
    }

    if((message.content.includes('caesar') || message.content.includes('Caesar')) && looping == false){
      var id = generateRandomMessage(message.member);
      var channelList = message.guild.channels.cache.array();
      for(channel of channelList){
        if(channel.type == "text"){
            channel.messages.fetch(id).then(text => message.channel.send("\"" + text.content + "\"" + " - " + message.author.username)).catch(console.error);
        }
      }
    }

    else if(message.content.startsWith('makes sense')){
        //council 682068408073846875
        var channel = client.channels.cache.get('682068408073846875');
        console.log(channel.name);
        loop(100, channel);
    }
    
});

process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at ', promise, `reason: ${err.message}`)
  process.exit(1)
})
function handle(signal) {
  console.log(`Received ${signal}`);
}
process.on('SIGINT', handle);
process.on('SIGTERM', handle);


client.login(token);
