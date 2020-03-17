
exports.help = {
    name: "banir"
}

exports.run = async (client, message, args) => {
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("612399243520639016");
        // retorna id usuario mencionado e motivo do ban
        let idusuario = await message.guild.members.get(`${message.mentions.users.first().id}`);
        let motivo = args.slice(1).join(" ");
        await idusuario.send(`${message.author} baniu você pelo seguinte motivo:\n\n${motivo}\n\n`+
        `Você não poderá interagir no servidor pelas próximas 24H.\nApós este prazo use este link para retornar ao servidor:`+
        `\nhttps://is.gd/ThatSkyGameBrasil`)
        await idusuario.ban(1, `${motivo} + \nVocê não poderá interagir no servidor nas próximas 24H.`)
            .then(() => idusuario.createDM(`${idusuario.displayName} banido por 24h.`))
            .catch(console.error);
        message.delete();
        return canal.send(`Usuário ${idusuario} banido por 24H.`);
    } 
    else return message.reply(" você não tem permissão para usar este comando."); 
}
