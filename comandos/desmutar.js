
exports.help = {
    name: "desmutar"
}

exports.run = async (client, message, args) => {
    console.log("desmutando")
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("612399243520639016");
        // Captura pessoa mencionada na mensagem
        var rebelde = await message.guild.members.get(`${message.mentions.users.first().id}`);
        // Verifica se ela foi silenciada
        if (rebelde.roles.some(x => x.name === "Silenciados")) {
            await rebelde.removeRole(`621755924855652353`);
            // notificando rebelde desmutado
            await rebelde.send(`Você não está mais silenciado.\n`+
            `Cuide para ter um bom relacionamento com seus colegas.\n`+
            `Vamos fazer, juntos, o nosso servidor ser um lugar agradavel para todos. `);
            await message.delete(); 
            return canal.send(`${message.author} removeu silenciar de ${rebelde}.`);
        } 
        else return canal.send(`${message.author} o usuário ${rebelde} precisa estar silenciado para usar !desmutar.`);       
    } 
}
