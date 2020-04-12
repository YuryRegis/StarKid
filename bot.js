const queue = new Map();
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const newmember = require("./newmember.cjs");
const { dbUno } = require("./Routes/rotas");
const messageHandler = require("./messageHandler.cjs");
const { watsonAssistant } = require('./Routes/cloud');
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
//const reactionHandler = require("./reactionHandler.mjs")
//const messageBotHandler = require("./messageBotHandler.mjs")

client.commands = new Discord.Collection(); //Cria coleção de comandos

//carregando arquivos de comandos para coleção criada
fs.readdir("./comandos/",(erro, arquivo) => {
	if(erro) console.error(erro);
	let arquivojs = arquivo.filter(f => f.split(".").pop() == "js");
	arquivojs.forEach((arq, i) => {
		let prop = require(`./comandos/${arq}`);
		console.log(`Comando ${arq} carregado com sucesso.`);
		client.commands.set(prop.help.name, prop);
	});
});


client.on("ready", () => {
    console.log(`Bot iniciado! ${client.users.size} usuários, ${client.channels.size} canais e ${client.guilds.size} servidores.`);
	client.user.setActivity(`Sky: Filhos da luz`);
	if(dbUno()) {
		console.log("Rota: banco de dados OK");
	};
})


client.on("guildCreate", guild => {
    console.log(`O bot entroou no servidor ${guild.name} id:${guild.id} com ${guild.memberCount} membros.`);
    client.user.setActivity(`Estou em ${guilds.size} servidores!`);
})


client.on("guildDelete", guild => {
    console.log(`Bot removido do servidor ${guild.name} id: ${guild.id}`);
    client.user.setActivity(`Estou em ${guilds.size} servidores.`);
})


client.on("message", async message => {
	if(message.author.bot) {
		if (message.channel.id === "634200679224967188" && message.content[0] === config.prefix) {
			messageHandler.run(message, queue, client);
		}
		return // messageBotHandler.run(message); //mensagem de bots
	}
	let flood   = "653744153171066880";
	let chatBot = "634200679224967188";

	if (message.channel.id===flood) { 
		let verificaRoles = await message.member.roles.some(r => 
			r.name === "Android" || r.name === "Beta" || r.name === "Global" || r.name === "Apple"
		);
		if(!verificaRoles && message.content[0]!==config.prefix) {
			let salaRegras = message.guild.channels.get("603728556262031365");
			message.reply(`para ter acesso ao servidor, leia as ${salaRegras} e escolha um cargo para você **aqui** com o comando \`!cargo\`.`)
		}
	}
	if (message.channel.id === chatBot) {
		if(message.content[0]==="!") return;
		let watson = await watsonAssistant(AssistantV1, IamAuthenticator, message);
		return message.reply(`${watson}`);
	}
	if(message.channel.type === "dm") return; //ignora mensagens diretas
	
	messageHandler.run(message, queue, client);
	return undefined;
});


client.on("guildMemberAdd", async member => {
	newmember.run(member, client);
});

client.on('messageReactionAdd', (reaction, user) => {
	if (user.bot) return;
	//reactionHandler.run(reaction, user);
})

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Conectado no canal de voz'));

client.on('disconnect', () => console.log('Desconectado do canal de voz, até breve!'));

client.on('reconnecting', () => console.log('Reconectando...'));


client.login(config.token);
