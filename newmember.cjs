const jimp = require("jimp");
const {RichEmbed} = require("discord.js");


exports.run = async (member, client) => {
    let canal       = await client.channels.get("603723288757403648");
	let membername  = await member.user.username.split(" ")[0];
	let memberId    = await member.user.id;
	let fonte       = await jimp.loadFont(jimp.FONT_SANS_64_WHITE);
	let fonte2      = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
	let mask        = await jimp.read(`./images/mascaraHEX.png`);
	let fundo       = await jimp.read(`./images/Fundo.png`);
	let emojiAbraco = await client.emojis.get("628443314307334144");

	jimp.read(member.user.displayAvatarURL).then(async avatar => {
		await avatar.resize(150, 150);
		await mask.resize(150, 150);
		await avatar.mask(mask); //Aplica mascara no avatar
		
		if (membername.length < 10) { //nome pequeno ficara centralizado
			await fundo.print(fonte, 269, 150, membername); //Escreve texto na imagem de fundo
			await fundo.print(fonte2, 270, 151, membername); //Cria efeito de contorno (fonte + fonte2)
		} else { //nome grande ficara mais à esquerda
			await fundo.print(fonte, 159, 150, membername); //Escreve texto na imagem de fundo
			await fundo.print(fonte2, 160, 151, membername); //Cria efeito de contorno (fonte + fonte2)
		}
		await fundo.composite(avatar, 19, 59).write(`./images/bemVindo.png`); //Gera imagem *.png
		
		async function envio() {
			const embed = new RichEmbed()
				.setColor(`RANDOM`)
				.attachFiles(['./images/bemVindo.png'])
				.setImage('attachment://bemVindo.png')
				.addField('**BEM-VINDO(A)**',
					`\n\n${client.users.get(memberId)}, para você ter acesso ao conteúdo do nosso servidor` +
					` é preciso aceitar nossos termos e ${client.channels.get("603728556262031365")}. Lá ` + 
					`você encontrará instruções para ganhar o seu cargo.\nTe vejo em Sky! ${emojiAbraco} ` 
				);
			const m = await canal.send(embed);
			m.react(emojiAbraco);
		} envio();

		console.log(`Mensagem de bem-vindo enviada para ${member.user.username}...`);
	})
		.catch(err => {
			console.log("Erro ao obter avatar!");
			console.log(err)
		});
}
