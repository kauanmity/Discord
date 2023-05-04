const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.GuildMembers,
    ],
    partials: [Discord.Partials.Channel],
});
const config = require("./config.json");

module.exports = client

client.on('interactionCreate', (interaction) => {
  const logcomandos = client.channels.cache.get("coloque id do canal aqui");

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply({content: `Deu algum erro, contate <@627928283987574835>`, ephemeral: true});

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    footer = config.footer
    dono = config.dono

    cmd.run(client, interaction)

    logcomandos.send(`${interaction["member"]} usou o comando \`${interaction}\``)

   }
})

client.on("ready", () => {
  //Status
  client.user.setPresence({
    activities: [{ name: `mity#0001`, type: Discord.ActivityType.Playing }],
    status: 'online',
  });
  console.log(`${client.user.username} online!`)
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

process.on("unhandledRejection", (reason, promise) => {
  const channel = client.channels.cache.get("coloque id do canal aqui");
  channel.send({ content: `Aconteceu algum erro\n${reason}\n${promise}` });
})

process.on("uncaughtException", (err, origin)=>{
  const channel = client.channels.cache.get("coloque id do canal aqui");
  channel.send({ content: `Aconteceu algum erro\n${err}\n${origin}` });
})

client.login(config.token)