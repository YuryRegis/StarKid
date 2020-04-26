const {RichEmbed} = require("discord.js");


exports.help = {
    name: "banir"
}


exports.run = async (client, message, args) => {
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("698758957845446657"),
            aviso = await client.channels.get("603720312919556239");

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
            .then( () => {
                let nome  = idusuario.displayName,
                    embed = new RichEmbed(),
                    gif   = 'https://media1.tenor.com/images/4c906e41166d0d154317eda78cae957a/tenor.gif';

                embed.setTitle("**BANIDO**")
                     .setColor('#CF3F47')
                     .setDescription(`${nome} foi pego! Banido do servidor por \`\`\`${motivo}\`\`\``)
                     .setImage(gif);
                
                aviso.send(embed) 
            }) 
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
