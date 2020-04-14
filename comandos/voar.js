const faq = require("./assets/faq");


exports.help = {
    name: "voar"
}

exports.run = async function(client, message, args) {

    const id        = message.channel.id;
    const flood     = message.guild.channels.get("653744153171066880");
    const permissao = await message.member.roles
        .some(r =>  r.name === "Staff" || r.name === "Admin" || r.name === "Moderador");

    if(id !== flood.id && id !== "603727284922482699") {
        if(!permissao) {
            return message.reply(`Você não tem permissão ou não esta no canal ${flood}.`)
        }
    }
    if (id === "603727284922482699" && !permissao)
        return message.reply(`você nao tem permissão para usar este comando aqui. Use-o em ${flood}`)

    let regex    = /@/,
        resposta = faq.voar(client, message);

    if(regex.test(args[0])) {
        let alvo = message.mentions.members.first();

        return message.channel.send(`${alvo}`, resposta);
    }

    return message.channel.send(resposta);
}