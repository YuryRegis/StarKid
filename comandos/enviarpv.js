
exports.help = {
    name: "enviarpv"
}

exports.run = async (client, message, args) => {
    await message.delete();
    
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let mensaoUsuario = /@/;
        let canal = await message.channel;

        if(!isNaN(args[0])) {
            let membro = await canal.guild.members.get(args[0]);

            if(!membro) {
                return canal.send("Membro não encontrado.");
            }
            return membro.send( `${membro.user.username}: ${args.slice(1).join(" ")}` )
                .then()
                .catch(err => { canal.send("Terminal `!enviarpv`" + `\`\`\`${err}\`\`\``) });          
        } 
        if(mensaoUsuario.test(args[0])) {
            let membro = message.mentions.members.first();

            if(!membro) {
                return canal.send(`Membro não encontrado.`);
            }
            return membro.send( `${membro.user.username}: ${args.slice(1).join(" ")}` )
                .then()
                .catch(err => { canal.send("Terminal `!enviarpv`" + `\`\`\`${err}\`\`\``) }); 
        } else {
            return message.reply("Erro de sintaxe. Use `!enviarpv @usuario` ou `!enviarpv idUsuario`");
        }
    } else {
        return message.reply("Apenas @Staff ou @Admin podem usar este comando.");
    }
}
