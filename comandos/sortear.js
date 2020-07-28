const {RichEmbed} = require('discord.js');


exports.run = async (client, message, args) => {
    
    if(!message.member.roles.some(r => r.name === "Admin" || r.name === "Staff" || r.name === "Moderador"))
        return message.reply("Você não tem permissão para usar este comando.");
    
    if (isNaN(args[0]))
        return message.reply(`${args[0]} não é um ID de mensagem válido.`);

    const messageID = args[0],
          msgAlvo   = await message.channel.messages.get(messageID);

    let participantes = await msgAlvo.reactions.get(`🎉`).users,
        vencedorID    = participantes.random(),
        embeds        = msgAlvo.embeds[0];
    
    console.log("PARTICIPANTES => "+participantes,"ID => "+vencedorID);
    const embed    = new RichEmbed(embeds);

    embed.addField(`**VENCEDOR**`, `${vencedorID}`);

    msgAlvo.edit(embed);
}


exports.help = {
    name: "sortear"
}