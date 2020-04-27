
exports.help = {
    name: "desmutar"
}

exports.run = async (client, message, args) => {
    console.log("desmutando")
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("698758957845446657");
        
        // Captura pessoa mencionada na mensagem
        var rebelde = await message.guild.members.get(`${message.mentions.users.first().id}`);
        
        // Verifica se ela foi silenciada
        if (rebelde.roles.some(x => x.name === "Silenciados")) {
            await rebelde.removeRole(`621755924855652353`);
            
            // notificando rebelde desmutado
            await rebelde.send(`Você não está mais silenciado.\n`+
            `Cuide para ter um bom relacionamento com seus colegas.\n`+
            `Vamos fazer, juntos, o **nosso servidor** ser um lugar **agradavel para todos.** `)
                .then()
                .catch(err => {
                    console.log(err);
                    canal.send(`!desmutar error\nNão é possível enviar mensagem privada\n\`\`\`${err}\`\`\``);
                });
            
            await message.delete(); 
            return canal.send(`\`${message.author}\` removeu silenciar de ${rebelde.displayName}.`);
        } 
        else return message.reply(`o usuário ${rebelde.displayName} precisa estar silenciado para usar !desmutar.`);       
    } 
}
