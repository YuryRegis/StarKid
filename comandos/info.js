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

    const membro = getMember(message, args.join(" "));
    const posicao = getJoinRank(membro.id, message.guild);
    const registro = formatDate(membro.joinedAt);
    const cargos = membro.roles
        .filter(cargo => cargo.id !== message.guild.id)
        .map(cargo => cargo)
        .join(", ") || "Sem cargos definidos";
    
        
    const embed = new RichEmbed()
        .setTitle('ThatSkyGameBrasil - Tudo sobre Sky!')
        .setFooter(`Requisitado por ${message.member.user.username}`, client.user.displayAvatarURL)
        .setThumbnail(membro.user.displayAvatarURL)
        .setTimestamp()
        .setColor("RANDOM")
        .addField("\nInformações de registro", stripIndents
            `**Nome:** ${membro.displayName}
            **Membro Nº:** ${posicao}
            **Data registro:** ${registro}`)
       .addField("\nDados de usuário", stripIndents
            `**Nome de usuário:** ${membro.user.username}
            **Cargos/tags:** ${cargos}`);
    if (membro.user.presence.game)
        embed.addField(`**Jogando:** ${membro.user.presence.game.name}`);

    m = message.channel.send(embed);
    message.delete()
}
