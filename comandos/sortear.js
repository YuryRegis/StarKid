const {MessageEmbed} = require('discord.js'),
      {verificaPerm} = require('../funcoes/members');


exports.run = async (client, message, args) => {
    
    const perm = await verificaPerm(message.member);

    if(!perm)
        return message.reply("Você não tem permissão para usar este comando.");
    
    if (isNaN(args[0]))
        return message.reply(`${args[0]} não é um ID de mensagem válido.`);

    const messageID     = args[0],
          msgAlvo       = await message.channel.fetchMessage(messageID),
          participantes = await msgAlvo.reactions.get(`🎉`).fetchUsers();

    
    let vencedorID    = participantes.random(),
        embeds        = msgAlvo.embeds[0];
    
    console.log("PARTICIPANTES => "+participantes,"ID => "+vencedorID);
    const embed    = new MessageEmbed(embeds);

    embed.addField(`**VENCEDOR**`, `${vencedorID}`);

    msgAlvo.edit(embed);
}


exports.help = {
    name: "sortear"
}