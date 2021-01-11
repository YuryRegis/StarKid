const faq = require("./assets/faq"),
    getID = require('../funcoes/ids.json'),
{verificaPerm} = require('../funcoes/members.js');


exports.help = {
    name: "temporadas"
}

exports.run = async function(client, message, args) {

    const id        = message.channel.id;
    const flood     = message.guild.channels.cache.get(getID.sala.FLOOD);
    const permissao = await verificaPerm(message.member);

    if(id !== flood.id && id !== getID.sala.PGRS) {
        if(!permissao) {
            return message.reply(`Você não tem permissão ou não esta no canal ${flood}.`)
        }
    }
    if (id === getID.sala.PGRS && !permissao)
        return message.reply(`você nao tem permissão para usar este comando aqui. Use-o em ${flood}`)

    let regex    = /@/,
        resposta = await faq.temporadas(client, message);

    if(regex.test(args[0])) {
        let alvo = message.mentions.members.first();

        return message.channel.send(`${alvo}`, resposta);
    }

    return message.channel.send(resposta);
}