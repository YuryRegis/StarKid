const Discord = require("discord.js");


exports.run = async (client, message, args) => {
    
    let salaTag = await message.guild.channels.get('701571073845755974'),
        tag     = 'id_' + message.author.tag + '🔐',
        info    = ' envie uma **selfie** segurando um documento de identidade (RG, CNH, CTPS, Passaport,etc).\n' + 
                  'Escolha um local bem iluminado, a sua ID precisa estar **LEGÍVEL** na selfie.';
    // let novaRole = await message.guild.createRole({
    //     name: tag,
    //     hoist: false,
    //     mentionable: false,
    // });

    let novaSala = await message.guild.createChannel(tag, {
        type: 'text',
        permissionOverwrites: [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
        },
        {
            id: message.author.id,
            allow: ['VIEW_CHANNEL'],
        }]
    })
    
    
    novaSala.send(`${message.author}` + info, {file: 'https://i.ibb.co/tCJ7Dm1/idproof.png'})
            .then(() => {
                
                let filtro  = f => !f.author.bot;
                let coletor = new Discord.MessageCollector(novaSala, filtro);
                

                coletor.on('collect', async (msg, col) => {
                    let atch = await msg.attachments.first(1);
                    if (atch[0] != undefined)
                        coletor.stop();
                })

                coletor.on('end', async coletado => {
                    let resposta = await coletado.first().attachments.first().proxyURL,
                        mensagem = `<@&607754714100269056> ${message.author.tag} solicitou tag +18.`;
                    await salaTag.send(mensagem, { file:resposta });
                    novaSala.delete();
                })
            })

    return;
    
}

exports.help = {
    name: "tag18"
}