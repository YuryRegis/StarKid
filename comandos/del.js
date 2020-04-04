
//comando para apagar multiplas mensagens
exports.run = async (client, message, args) => {
    
    const salaAtual = message.channel;
    const salaADM = client.channels.get("612399243520639016");

    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        try {
            let num = parseInt(args[0]) + 1;
            salaAtual.fetchMessages({limit: num})
                .then(async mensagens => { await salaAtual.bulkDelete(mensagens)
                    .catch(err => { salaADM.send(`Terminal \`!del\` \`\`\`${err}\`\`\``) });
                });             
            const m = await salaAtual.send(`${args[0]} mensagens apagadas...`);
            
            m.delete(30000)
                .catch(err => { salaADM.send(`Terminal \`!del\` \`\`\`${err}\`\`\``) });
        } 
        catch(err) {
            console.log(err);
            message.reply(`Algo de errado não está certo!\nVerifique o comando digitado.`)
        }
    } else { message.reply(` você não possui permissão para usar este comando.`) }
}

exports.help = {
    name: "del"
}
