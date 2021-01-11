const {MessageEmbed} = require("discord.js"),
	  {verificaPerm} = require('../funcoes/members');
	  
const getID = require('../funcoes/ids.json'),
      jimp  = require("jimp");


exports.run = async (client, message, args) => {
	const memberId = await args[0];
	const canal    = await client.channels.cache.get(getID.sala.LOGS);
	const member   = await client.users.cache.get(memberId);
	const membername = await member.username;

	let fonte = await jimp.loadFont(jimp.FONT_SANS_64_WHITE);
	let fonte2 = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
	let mask = await jimp.read(`./images/mascaraHEX.png`);
	let fundo = await jimp.read(`./images/Fundo.png`);
	let emojiAbraco = client.emojis.cache.find(abraco => abraco.name === "abraco");

	jimp.read(await member.displayAvatarURL).then(avatar => {
		avatar.resize(150, 150);
		mask.resize(150, 150);
		avatar.mask(mask); //Aplica mascara no avatar
		
		if (membername.length < 10) { //nome pequeno ficara centralizado
			fundo.print(fonte, 269, 150, membername); //Escreve texto na imagem de fundo
			fundo.print(fonte2, 270, 151, membername); //Cria efeito de contorno (fonte + fonte2)
		} else { //nome grande ficara mais à esquerda
			fundo.print(fonte, 159, 150, membername); //Escreve texto na imagem de fundo
			fundo.print(fonte2, 160, 151, membername); //Cria efeito de contorno (fonte + fonte2)
		}
		fundo.composite(avatar, 19, 59).write(`./images/bemVindo.png`); //Gera imagem *.png
		
		async function envio() {
			const embed = new MessageEmbed()
				.attachFiles(['./images/bemVindo.png'])
				.setImage('attachment://bemVindo.png')
				.addField('**BEM-VINDO(A)**',
					`\n\n${client.users.cache.get(memberId)}, fique à vontade para tirar suas dúvidas em ` +
					`${client.channels.cache.get("603727284922482699")} ou apareça aqui para trocar uma idéia ` + 
					`com outros jogadores. Não esqueça de conferir as ${client.channels.cache.get("603728556262031365")}` +
					` do nosso servidor e de **atribuir seu(s) cargo(s)** usando o comando \`!cargo\`. Te vejo em Sky! ${emojiAbraco}`)
				.setColor(`RANDOM`);
			const m = await canal.send(embed);
			m.react(emojiAbraco);
			message.delete();
		} envio();

		console.log(`Mensagem de bem-vindo enviada para ${member.user.username}...`);
	})
		.catch(err => {
			console.log("Erro ao obter avatar!\n", err);
		});
}

exports.help = {
    name: "newuser"
}
