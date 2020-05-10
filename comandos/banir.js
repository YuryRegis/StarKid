const {RichEmbed} = require("discord.js");


exports.help = {
    name: "banir"
}


exports.run = async (client, message, args) => {
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let canal = await client.channels.get("603723288757403648"),
            aviso = await client.channels.get("603720312919556239"),
            alvo  = await message.mentions.users.first();

            if (alvo === undefined)
                return message.reply('Membro alvo não localizado, verfique se digitou corretamente ou se ele já não faz mais parte do servidor.');
    
            // retorna id usuario mencionado e motivo do ban
            let idusuario = await message.guild.members.get(`${alvo.id}`)
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
                        gif   = 'https://media1.tenor.com/images/7129d4fbd2bd63ab987a768951ff44cb/tenor.gif';
    
                    embed.setColor('#CF3F47')
                         .setTitle("**BANIDO**")
                         .setThumbnail('https://i.ibb.co/FD93h6p/KRILL.png')
                         .setDescription(`OPA! Parece que ${nome} foi pego por um Krill !!!`)
                         .setImage(gif);
                    
                    if(motivo.length!==0)
                        embed.addField(`**MOTIVO**`, motivo);                         
                    
                    aviso.send(embed)
                        .then(async msg => {
                            let head  = await client.emojis.get('698231847330644068'), 
                                body  = await client.emojis.get('698231902993121370'), 
                                tail  = await client.emojis.get('698231942205931570'); 
                            
                            await msg.react(head);
                            await msg.react(body);
                            await msg.react(tail);
                        })
                        .catch(err => canal.send(`Terminal Ban\n\`\`\`${err}\`\`\``))
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