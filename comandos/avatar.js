
exports.run = async (client, message, args) => {
    message.delete();
    message.reply("Comando desabilitado temporariamente")
        .then(m => m.delete({ timeout: 1500 }))
    return;
    await message.delete();
    
    let admin    = await client.users.get("322421000153333761"),
        salaLogs = await message.guild.channels.get('698758957845446657');
    
        if(message.member.roles.some(r => r.name === "Admin"||r.name === "Staff"|| r.name==='Moderador')) {
            try {
                let membro   = {};
                
                if (/@/.test(args[0])) {
                    membro = await message.mentions.members.first();
                    if (!membro) return message.reply(`${args[0]} não encontrado`);
                    membro = membro.user;
                } else {
                    membro = await client.users.get(args[0]);
                    if (!membro) message.reply(`${args[0]} não encontrado`);
                }
                let avatar = await membro.displayAvatarURL
                let sender = message.author
    
                await sender.send(`Avatar de ${membro.username}:\n${avatar}`)
                    .then()
                    .catch(err => salaLogs.send(`Terminal **avatar**:\`\`\`Alvo:      ${sender.username}\n${err}\`\`\``));
    
                await admin.send(`${message.author.username} solicitou avatar de ${membro.username}`);
                return;
    
            }catch(err) {
                console.log(err);
                salaLogs.send(`Terminal **avatar**:\`\`\`Alvo:      ${args[0]}\n${err}\`\`\``);
            }
        } else message.reply(` você não possui permissão para usar este comando.`);
    }


exports.help = {
    name: "avatar"
}
