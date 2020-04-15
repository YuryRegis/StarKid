
exports.help = {
    name: "banir"
}

exports.run = async (client, message, args) => {
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("698758957845446657");
        // retorna id usuario mencionado e motivo do ban
        let idusuario = await message.guild.members.get(`${message.mentions.users.first().id}`);
        let motivo = args.slice(1).join(" ");

        await idusuario.send(`${message.author} baniu você pelo seguinte motivo:\n\n${motivo}\n\n`+
        `Você não poderá interagir no servidor **ThatSkyGameBrasil**`)
            .then( () => canal.send(`Usuário ${idusuario} banido.`) )
            .catch( err => {
                console.log(`Ban error => ${err}`);
                canal.send(`Terminal Ban\n\`\`\`Não posso enviar mensagem privada\n\n${err}\`\`\``);
            });
        
        await idusuario.ban(1, `${motivo} + \nVocê não poderá interagir no servidor.`)
            .then( () => idusuario.createDM(`${idusuario.displayName} banido.`) ) 
            .catch(err => {
                console.log(`Ban error => ${err}`);
                let log = `Terminal Ban\n\`\`\`${err}\`\`\``;
                canal.send(log);
            });
        message.delete();
        return ;
    } 
    else return message.reply(" você não tem permissão para usar este comando."); 
}
