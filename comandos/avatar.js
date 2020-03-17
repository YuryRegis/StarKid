
exports.run = async (client, message, args) => {
    let admin = client.users.get("322421000153333761")
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        try {
            let membro = await client.users.get(args[0])
            let avatar = await membro.displayAvatarURL
            let sender = message.author
            await sender.send(`Avatar de ${membro.username}:\n${avatar}`)
            await admin.send(`${message.author.username} solicitou avatar de ${membro.username}`)
            return message.delete()
        } catch(err) {
            console.log(err);
            message.reply(`Algo de errado não está certo!\nVerifique o comando digitado.`)
        }
    } else { message.reply(` você não possui permissão para usar este comando.`) }
}

exports.help = {
    name: "avatar"
}