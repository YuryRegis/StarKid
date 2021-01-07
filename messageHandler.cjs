const getID             = require('./funcoes/ids.json'),
      { verificaVIP }   = require('./comandos/assets/loto/ticket');

exports.run = async (message, queue, client) => {
	const config         = require("./config.json"),
	      serverQueue    = queue.get(message.guild.id),
		  responseobject = require(`./comandos/responseobject.cjs`),
	      salaLogs       = await client.channels.cache.get(getID.sala.LOGS),
	      args           = message.content.slice(config.prefix.length).trim().split(/ +/g);
		
	let sender  = message.author, //Captura autor da mensagem
	    user    = message.member.user.tag,
	    comando = args.shift().toLowerCase(),
	    ch      = message.channel.name.toString();


	if(client.commands.get(comando)) {  //Comando === comandos previamente carregados?
		
		if (message.content[0] === config.prefix) {
			verificaVIP(message);
			
			console.log(`${comando} digitado por ${user} no canal ${ch}.`);

			if(comando !== 'denuncia')
				salaLogs.send(`${comando} digitado por ${user} no canal ${ch}.`);
				
			client.commands.get(comando).run(client, message, args, queue, serverQueue);
		} else return;
	} else 
		if (message.channel.id === getID.sala.CHATBOT) { //ignora mensagens simples do canal #pergunte_ao_bot
			if (message.content[0] == config.prefix) {
				responseobject.run(message, sender, client);
			}
			return;
		} 
		responseobject.run(message, sender, client);
	
}