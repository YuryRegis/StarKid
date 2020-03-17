
//comando para apagar multiplas mensagens
exports.run = async (client, message, args) => {
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        try {
            let num = parseInt(args[0]) + 1;
            message.channel.fetchMessages({limit: num}).then(mensagens => {
                message.channel.bulkDelete(mensagens);
            });
            const m = await message.channel.send(`${args[0]} mensagens apagadas...`);
            m.delete(30000);
        } catch(err) {
            console.log(err);
            message.reply(`Algo de errado não está certo!\nVerifique o comando digitado.`)
        }
    } else { message.reply(` você não possui permissão para usar este comando.`) }
}

exports.help = {
    name: "del"
}
