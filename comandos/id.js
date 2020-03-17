
exports.help = {
    name: "id"
}

exports.run = async (client, message, args) => {
    console.log(args[0].split("@"));
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("612399243520639016");
        let idusuario = args[0].split("@")[1].split(">")[0];
        await message.author.send(`O ID do usuário que deseja é ${idusuario}`);
        await message.delete();
        return canal.send(`ID enviado por DM ${message.author}`);
    } 
    else return message.reply(" você não tem permissão para usar este comando."); 
}
