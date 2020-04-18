let blog = "https://thatskygamebrasil.weebly.com/"
let ytstars = "https://www.youtube.com/playlist?list=PL2PBX0NE622h69NGaxY670OiGutKGXGxd"
let ytsemotes = "https://www.youtube.com/playlist?list=PL2PBX0NE622i_Gv86wXRwtBWDvid25spz"
let ytsounds = "https://www.youtube.com/playlist?list=PL2PBX0NE622gm8kQ8pUNXU1z6j-vwMwJs"


exports.run = async (message, sender, client) => {
    let responseObject = {
    "!ajuda": `Entre no canal ${client.channels.get("612753120925057036")} para obter a lista de comandos atualizada.`,
    "!convite" : "https://is.gd/ThatSkyGameBrasil",
    "!blog": `${blog}`,
    "!bemotes": `${blog + "emotes"}`,
    "!bestrelas": `${blog + "estrelas"}`,
    "!bajuda": `${blog + "tutoriais"}`,
    "!bmusica": `${blog + "musica"}`,
    "!bcolecionaveis": `${blog + "colecionaveis"}`,
    "!bespiritos": `${blog + "espiritos"}`,
    "!ytestrelas" : "https://www.youtube.com/playlist?list=PL2PBX0NE622h69NGaxY670OiGutKGXGxd",
    "!ytemotes": "https://www.youtube.com/playlist?list=PL2PBX0NE622i_Gv86wXRwtBWDvid25spz",
    "!ytsons": "https://www.youtube.com/playlist?list=PL2PBX0NE622gm8kQ8pUNXU1z6j-vwMwJs",
    "!ytajuda": "https://www.youtube.com/playlist?list=PL2PBX0NE622i2YqGV5m238Uve-M2xt6Pw",
    "!ytmusica": "https://www.youtube.com/playlist?list=PL2PBX0NE622jT7JczNX3D3Z5Y-Uidfuyo",
    "!ytgratidao": "https://www.youtube.com/playlist?list=PL2PBX0NE622gv9FnvcTjHDruUBGXdXNR1",
    "!youtubeliv" : "https://www.youtube.com/channel/UCmCFwg2jRK7jHFc4N4JYCjQ",
    "!ytthatskygamebrasil" : "https://www.youtube.com/c/ThatSkyGameBrasil",
    "!youtubeharry" : "https://www.youtube.com/c/ThatSkyGameBrasil",
    "!nightzel " : "https://www.youtube.com/channel/UCiIIyRXAVeTDG5FN1IrfP_w",
    "bot quero ver a fuça da liv" : "Você pode ver a fuça da @355147512216158238 aqui:\nhttps://www.youtube.com/channel/UCmCFwg2jRK7jHFc4N4JYCjQ",
    "bot quero ver a fuça da ana" : "Você pode ver a fuça da @355147512216158238 aqui:\nhttps://www.youtube.com/channel/UCmCFwg2jRK7jHFc4N4JYCjQ",
    "bom dia": `:coffee: Um bom dia para você também ${sender}!`,
    "bom dia!": `:coffee: Um bom dia para você também ${sender}!`,
    "boa noite": `:first_quarter_moon_with_face: Boa noite ${sender}.`,
    "boa noite!": `:first_quarter_moon_with_face: Boa noite ${sender}.`,
    "boa tarde": `:sunflower: Boa tarde ${sender}.\n      É uma boa hora para jogar Sky, não?`,
    "boa tarde": `:sunflower: Boa tarde ${sender}.\n      É uma boa hora para jogar Sky, não?`,
    "oi bot": `Olá, que bom te ver por aqui ${sender}. :smiley:`,
    "ola bot": `Olá, que bom te ver por aqui ${sender}. :smiley:`,
    "olá bot": `Olá, que bom te ver por aqui ${sender}. :smiley:`,
    "obrigado bot": `Conte sempre comigo ${sender}! :ok_hand:`,
    "valeu bot": `Conte sempre comigo ${sender}! :ok_hand:`,
    "vlw bot": `Conte sempre comigo ${sender}! :ok_hand:`,
    "bom dia bot": `:coffee: Um bom dia para você também ${sender}!`,
    "bom dia bot!": `:coffee: Um bom dia para você também ${sender}!`,
    "boa noite bot": `:first_quarter_moon_with_face: Boa noite ${sender}.`,
    "boa noite bot!": `:first_quarter_moon_with_face: Boa noite ${sender}.`,
    "boa tarde bot": `:sunflower: Boa tarde ${sender}.\n      É uma boa hora para jogar Sky, não?`,
    "boa tarde bot": `:sunflower: Boa tarde ${sender}.\n      É uma boa hora para jogar Sky, não?`,
    "onde encontro estrelas?" : `Blog:\n${blog + "estrelas"}\nYoutube:\n${ytstars}`,
    "onde encontro estrelas" : `Blog:\n${blog + "estrelas"}\nYoutube:\n${ytstars}`,
    "onde encontro espiritos?" : `Blog:\n${blog + "espiritos"}`,
    "onde encontro emotes?" : `Blog:\n${blog + "emotes"}\nYoutube:\n${ytsemotes}`,
    "onde encontro emotes" : `Blog:\n${blog + "emotes"}\nYoutube:\n${ytsemotes}`,
    "onde encontro sons?" : `Blog:\n${blog + "emotes"}\nYoutube:\n${ytsounds}`,
    "onde encontro sons" : `Blog:\n${blog + "emotes"}\nYoutube:\n${ytsounds}`,
    "como consigo coração?" : `Você consegue corações trocando com os espíritos ou por doação de seus amigos. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo coração" : `Você consegue corações trocando com os espíritos ou por doação de seus amigos. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo corações?" : `Você consegue corações trocando com os espíritos ou por doação de seus amigos. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo coração" : `Você consegue corações trocando com os espíritos ou por doação de seus amigos. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo velas" : `Você consgue velas ao derreter criaturas da ecuridão, acendendo velas ou por doação de amigos. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo velas?" : `Você consgue velas ao derreter criaturas da ecuridão, acendendo velas ou por doação de amigos. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo velas storm" : `Você consgue velas storm ao completar o Eden com sucesso. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo velas storm?" : `Você consgue velas storm ao completar o Eden com sucesso. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo velas da temporada" : `Durante uma temporada, observe em qual portal o espirito guardião esta parado, será neste reino que as velas da temporada estarão escondidas. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    "como consigo velas da temporada?" : `Durante uma temporada, observe em qual portal o espirito guardião esta parado, será neste reino que as velas da temporada estarão escondidas. Para mais, acesse o nosso blog ${blog+"colecionaveis"}`,
    }
    if (responseObject[message.content.toLowerCase()]) {
        console.log(`${message.member.user.tag} usou o comando ${message.content} em ${message.channel.name}`);
        return await message.channel.send(responseObject[message.content.toLowerCase()]);
    }
}

exports.help = {
    name: "responseObject"
}