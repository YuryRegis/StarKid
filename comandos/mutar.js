
exports.help = {
    name: "mutar"
}

exports.run = async (client, message, args) => {
    if(message.member.roles.some(r =>  r.name === "Staff" || r.name === "Admin")) {
        let canal = await client.channels.get("698758957845446657");
        
        // Captura pessoa mencionada na mensagem
        let alvo = await message.mentions.users.first();

        if (alvo === undefined) {
            var rebelde = await message.guild.members.get(args[0]);
            // console.log(rebelde, args[0]);   
        } else {
            var rebelde = await message.guild.members.get(alvo.id);
        }
        // verifica se usuario já não esta silenciado
        if (rebelde.roles.some(x => x.name === "Silenciados")) {
            return message.reply(`${rebelde.displayName} já se encontra silenciado...`)
        }
        let msg = args.slice(1).join(" "); // captura motivo para mutar o usuario

        await rebelde.send(`${message.author} silenciou você pelo seguinte motivo:\n` + 
        `\`\`\`${msg}\`\`\`\nVocê não poderá interagir nos canais de chat até que um Staff permita novamente.`)
            .then()
            .catch(err => {
                console.log(err);
                canal.send(`!mutar error\nUsuário não permite mensagem privada.\n\`\`\`${err}\`\`\``);
            });
            
        await rebelde.setRoles(['621755924855652353']); // Define role "Silenciados" para o usuario
        await message.delete();
        return canal.send(`\`${message.author}\` silenciou ${rebelde.displayName} usando o bot.`); 
    }    
}   
