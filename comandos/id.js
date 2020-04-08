
exports.help = {
    name: "id"
}

exports.run = async (client, message, args) => {
    message.delete();
    
    // console.log(args[0].split("@"));
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let regexSala = /#/;
        let canal = await client.channels.get("612399243520639016");

        if (regexSala.test(args[0])) {
            let procurado = await message.mentions.channels.first();
            message.author.send(`ID da sala: ${procurado.id}`);
            return canal.send(`ID da sala enviado por DM ${message.author}`);
        }
        
        let idusuario = args[0].split("@")[1].split(">")[0];
        await message.author.send(`O ID do usuário que deseja é ${idusuario}`);

        return canal.send(`ID enviado por DM ${message.author}`);
    } 
    else return message.reply(" você não tem permissão para usar este comando."); 
}
