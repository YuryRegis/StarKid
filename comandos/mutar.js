
exports.help = {
    name: "mutar"
}

exports.run = async (client, message, args) => {
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("612399243520639016");
        // Captura pessoa mencionada na mensagem
        if (message.mentions.users.first() === undefined) {
            var rebelde = await message.guild.members.get(args[0]);
            console.log(rebelde, args[0]);   
        } else {
            var rebelde = await message.guild.members.get(`${message.mentions.users.first().id}`);
        }
        // verifica se usuario já não esta silenciado
        if (rebelde.roles.some(x => x.name === "Silenciados")) {
            return canal.send(`${rebelde} já se encontra silenciado...`)
        }
        let msg = args.slice(1).join(" "); // captura motivo para mutar o usuario
        await rebelde.send(`${message.author} silenciou você pelo seguinte motivo:\n` + 
        `\`\`\`${msg}\`\`\`\nVocê não poderá interagir nos canais de chat até que um Staff permita novamente.`); 
        await rebelde.setRoles(['621755924855652353']); // Define role "Silenciados" para o usuario
        await message.delete();
        return canal.send(`${message.author} silenciou ${rebelde} usando o bot.`); 
    }    
}   
