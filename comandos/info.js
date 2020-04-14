const { getMember, formatDate, getJoinRank } = require("../funcoes.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.help = {
    name: "info"
}

exports.run = async (client, message, args) => {

    const flood = client.channels.get("653744153171066880");

    if(message.channel.id != "653744153171066880" && !message.member.roles.some(r =>  r.name === "Staff" || r.name === "Admin")){
        return message.channel.send(`Este comando não é permitido nesse canal. 
    Use o canal ${flood} , por gentileza.`)
    }

    const membro   = getMember(message, args.join(" "));
    const posicao  = getJoinRank(membro.id, message.guild);
    const registro = formatDate(membro.joinedAt);
    let   game     = "Nada, no momento.";
    const cargos   = membro.roles
        .filter(cargo => cargo.id !== message.guild.id)
        .map(cargo => cargo)
        .join(", ") || "Sem cargos definidos";

    if(membro.user.presence.game) {
        game = membro.user.presence.game.name;
    }
        
    const embed = new RichEmbed()
        .setTitle('ThatSkyGameBrasil - Tudo sobre Sky!')
        .setFooter(`Requisitado por ${message.member.user.username}`, client.user.displayAvatarURL)
        .setThumbnail(membro.user.displayAvatarURL)
        .setTimestamp()
        .setColor("RANDOM")
        .addField("\n**INFORMAÇÕES DE REGISTRO**", stripIndents
            `**Nome:** ${membro.displayName}
            **Membro Nº:** ${posicao}
            **Data registro:** ${registro}`)
        .addField("\n**INFORMAÇÕES DO MEMBRO**", stripIndents
            `**Nome de usuário:** ${membro.user.username}
            **Jogando:** ${game}
            **Cargos/tags:** ${cargos}`)
        .addField("**INFORMAÇÕES DO SERVIDOR**","ThatSkyGameBrasil")
        .addField("Total de membros:", client.users.size, true)
        .addField("Total de canais:", client.channels.size, true);

    m = message.channel.send(embed);
    message.delete()
}
