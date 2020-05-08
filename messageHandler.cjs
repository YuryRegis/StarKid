const { verificaVIP } = require('./comandos/assets/loto/ticket')


exports.run = async (message, queue, client) => {
	const config         = require("./config.json"),
	      serverQueue    = queue.get(message.guild.id),
		  responseobject = require(`./comandos/responseobject.cjs`),
	      salaLogs       = await client.channels.get('698758957845446657'),
	      radio          = await client.channels.get("708163178915168326"),
	      args           = message.content.slice(config.prefix.length).trim().split(/ +/g);
		
	let sender  = message.author, //Captura autor da mensagem
	    user    = message.member.user.tag,
	    comando = args.shift().toLowerCase(),
	    ch      = message.channel.name.toString();
	
	
	//Restringindo canal comandos_bot
	if(message.channel.id === "612753120925057036") {
		console.log(message.member.user.username + ` escreveu em #comandos_bot`);
		if(!message.member.roles.some(r => r.name === "Admin")) {
			console.log(`usuário não permitido. Apagando mensagem de ${sender}...`)	
			message.delete();
			return;	
		}
	}

	//restringindo chat nos canais de imagens e vídeos	
	if(message.channel.id === "603722851023061015" || message.channel.id === "620307322975158306") {
		if(!message.member.roles.some(r =>  r.name === "Staff" || r.name === "Admin" || r.name === "StarKid")) { //verifica roles
			if(message.embeds.length > 0) return;
			if(message.attachments.size == 0) { 	//verificando se é um link válido
				let extensions = ["jpg","png","gif","mp4","mov","mkv","bmp"]
				var splited = message.content.split(".")
				for(e in extensions) {
					console.log(extensions[e], splited[splited.length-1])
					if(extensions[e] == splited[splited.length-1]) return console.log("link valido");
				}
				const r = await message.reply("este canal só permite postagens de vídeos ou imagens.\n" +
				"Textos só serão permitidos na descrição da imagem ou vídeo postado.\n" +
				"Use os canais de chat para iniciar uma discussão, elogiar ou comentar.\n" +
				"Conto com sua compreensão e colaboração. :abraco:");
				r.delete(60000);
				return message.delete();				
			} //fim verifcação link valido
			else return;	
		} //fim verificação de roles
	}
	
	
	//restringindo bate-papo no canal de radio
	if(message.channel.id === radio.id && message.content[0] !== "!") {
		message.delete();
		let botMsg = await radio.send('Não é permitido chat aqui.');
		botMsg.delete(3000);
	}


	if(client.commands.get(comando)) {  //Comando === comandos previamente carregados?
		
		if (message.content[0] === config.prefix) {
			verificaVIP(message);
			
			console.log(`${comando} digitado por ${user} no canal ${ch}.`);

			if(comando !== 'denuncia')
				salaLogs.send(`${comando} digitado por ${user} no canal ${ch}.`);
				
			client.commands.get(comando).run(client, message, args, queue, serverQueue);
		} else return;
	} else 
		if (message.channel.id === "634200679224967188") { //ignora mensagens simples do canal #pergunte_ao_bot
			if (message.content[0] == config.prefix) {
				responseobject.run(message, sender, client);
			}
			return;
		} 
		responseobject.run(message, sender, client);
	
    
    //filtrar menções here e everyone
    if(message.mentions.everyone) {
        //verifica se é Admin ou Staff e notifica no cosole quem e onde usou @Everyone
        if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")){
            let usuario = message.member.user.tag.toString();
            return console.log(`${usuario} notificou todos em uma mensagem em ${ch}.`);        
        } 
		const reply = await message.reply(` você não tem permissão para marcar todos nesta mensagem.`);
		reply.delete(30000);
        await message.delete();
	}
}