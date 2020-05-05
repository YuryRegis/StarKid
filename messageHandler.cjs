const { verificaVIP } = require('./comandos/assets/loto/ticket')


exports.run = async (message, queue, client) => {
    const Util = require("discord.js");
	const YouTube = require('simple-youtube-api');
	const config = require("./config.json");
	const youtube = new YouTube(config.Google_API_KEY);
	const ytdl = require('ytdl-core');
	const responseobject = require(`./comandos/responseobject.cjs`);
	let sender = message.author; //Captura autor da mensagem
	let user = message.member.user.tag;
	let ch = message.channel.name.toString();
	let salaLogs = client.channels.get('698758957845446657');
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	let comando = args.shift().toLowerCase();
	const searchString = args.slice(0).join(' ');	
	const serverQueue = queue.get(message.guild.id);
	
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

	async function handleVideo(video, message, voiceChannel, playlist = false) {
		const serverQueue = queue.get(message.guild.id);
		//console.log(video);
		const song = {
			id: video.id,
			title: Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`
		};
		if (!serverQueue) {
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 6,
				playing: true
			};
			queue.set(message.guild.id, queueConstruct);
			queueConstruct.songs.push(song);
			//console.log(queueConstruct.songs.push(song));
			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				play(message.guild, queueConstruct.songs[0]);
			} catch (error) {
				console.error(`Eu não pude entrar no canal de voz: ${error}`);
				queue.delete(message.guild.id);
				return message.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
			}
		} else {
			serverQueue.songs.push(song);
			//console.log(serverQueue.songs);
			if (playlist) return undefined;
			else return message.channel.send(`Agora **${song.title}** foi adicionado a lista!`);
		}
		return undefined;
	}


	function play(guild, song) {
		const serverQueue = queue.get(guild.id);
		if (!song) {
			console.log("No music!");
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}
		//console.log(serverQueue.songs);
		const stream = ytdl(song.url, {filter : 'audioonly'});
		const dispatcher = serverQueue.connection.playStream(stream, song.url);
		//console.log(stream, dispatcher);
		dispatcher.on('end', reason => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 6);
		serverQueue.textChannel.send(`Tocando: **${song.title}**`);
	}


	//Busca comando digitado em comandos e o executa caso encontre
	let cmd = ["play","pause","resume","stop","np","queue", "skip", "volume"];
	
	cmd.forEach( async element => {
		if(comando===element) {
			console.log(`${comando} digitado por ${user} no canal ${ch}.`);
			salaLogs.send(`${comando} digitado por ${user} no canal ${ch}.`);
			
			if (comando === 'play') {
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				const voiceChannel = message.member.voiceChannel;
				if (!voiceChannel) return message.channel.send('Me desculpe, mas você precisa estar em um canal de voz para tocar música!');
				
				if(voiceChannel.id!==`612843867485765656`) return message.reply(`Só posso tocar músicas no canal de rádio`);
				
				const permissions = voiceChannel.permissionsFor(message.client.user);
				if (!permissions.has('CONNECT')) {
					return message.channel.send('Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!');
				}
				if (!permissions.has('SPEAK')) {
					return message.channel.send('Eu não posso falar neste canal de voz, verifique se eu tenho as permissões adequadas!');
				}
				if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
					const playlist = await youtube.getPlaylist(url);
					const videos = await playlist.getVideos();
					for (const video of Object.values(videos)) {
						const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
						await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
					}
					return message.channel.send(`Adc Playlist: **${playlist.title}** foi bem adicionada a lista!`);
				} else {
					try {
						var video = await youtube.getVideo(url);
					} catch (error) {
						try {
							var videos = await youtube.searchVideos(searchString, 10);
							let index = 0;
							message.channel.send(`__**Seleção**__\n${videos.map(video2 => 
								`**${++index} -** ${video2.title}`).join('\n')}\nEscolha uma das músicas de 1-10`);
							// eslint-disable-next-line max-depth
							try {
								var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
									maxMatches: 1,
									time: 25000,
									errors: ['time']
								});
							} catch (err) {
								console.error(err);
								return message.channel.send('Nenhum valor inserido ou está inválido , cancelando a operação de seleção de vídeo.');
							}
							const videoIndex = parseInt(response.first().content);
							var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
						} catch (err) {
							console.error(err);
							return message.channel.send('🆘 Não consegui obter nenhum resultado de pesquisa.');
						}
					}
					return handleVideo(video, message, voiceChannel);
				}
			} 
			else if (comando === 'skip') {
				if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz');
				
				if (!serverQueue) return message.channel.send('Não a nada tocando posso pular pra você');
				
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				serverQueue.connection.dispatcher.end('Skipado com Sucesso');
				return undefined;
			} 
			else if (comando === 'stop') {
				if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
				
				if (!serverQueue) return message.channel.send('Não tá tocando eu não posso parar pra você');
				
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				serverQueue.songs = [];
				serverQueue.connection.dispatcher.end('O Comando de parar foi usado!');
				return undefined;
			} 
			else if (comando === 'volume') {
				if (!message.member.voiceChannel) return message.channel.send('Você não está em um canal de voz!');
				
				if (!serverQueue) return message.channel.send('Não está tocando.');
				
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				if (!args[1]) return message.channel.send(`O Volume atual é: **${serverQueue.volume}**`);
				
				serverQueue.volume = args[1];
				serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 6);
				return message.channel.send(`Ajustar volume para: **${args[1]}**`);
			} 
			else if (comando === 'np') {
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				if (!serverQueue) return message.channel.send('Não a nada tocando.');
				return message.channel.send(`Tocando: **${serverQueue.songs[0].title}**`);
			} 
			else if (comando === 'queue') {
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				if (!serverQueue) return message.channel.send('Não a nada tocando.');
				return message.channel.send(`__**Lista de Música:**__\n${serverQueue.songs.map(song => 
					`**-** ${song.title}`).join('\n')}\n**Tocando Agora:** ${serverQueue.songs[0].title}`);
			} 
			else if (comando === 'pause') {
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				if (serverQueue && serverQueue.playing) {
					serverQueue.playing = false;
					serverQueue.connection.dispatcher.pause();
					return message.channel.send('⏸ Pausou');
				}
				return message.channel.send('Não a nada tocando.');
			}
			else if (comando === 'resume') {
				if (message.channel.id !== "613120191957565460") {
					return message.reply(` favor usar este comando no canal ${client.channels.get("613120191957565460")}.`);
				}
				if (serverQueue && !serverQueue.playing) {
					serverQueue.playing = true;
					serverQueue.connection.dispatcher.resume();
					return message.channel.send('▶ Rusumindo');
				}
				return message.channel.send('Não a nada tocando.');
			}
			return undefined;
		} 
	});

	if(client.commands.get(comando)) {  //Comando === comandos previamente carregados?
		
		if (message.content[0] === config.prefix) {
			verificaVIP(message);
			
			console.log(`${comando} digitado por ${user} no canal ${ch}.`);
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