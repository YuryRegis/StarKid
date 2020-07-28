const { RichEmbed } = require('discord.js'),
      Discord       = require('discord.js');

const atr = {};


exports.run = async (client, message, args) => {
    await message.delete();
    
    const salaOrigem = message.channel.id;

    // Comando simples (sem argumentos)
    if(args[0]===undefined)
    {
       let novaSala  = await criaSala(message);

       await novaSala.send({file: 'https://media0.giphy.com/media/QKknVAz6zo63Ad2GDZ/giphy.gif'});
       await novaSala.send(`${message.author}, irei te ajudar a criar um sorteio. ✍️`);

       await coletarDados(novaSala);

       return;
    }  
    
    //Comando com ID da mensagem para sorteio
    
}   


exports.help = {
    name: "sortear"
}



async function criaSala(message) {

    let sala = await message.guild.createChannel("criar_sorteio", 
    {
        type: 'text',
        permissionOverwrites: [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
        },
        {
            id: message.author.id,
            allow: ['VIEW_CHANNEL'],
        }]
    });

    return sala;
}


function printar(sala, objeto) {
    let embed  = new RichEmbed()
        .setTimestamp()
        .setColor(`#FAFB2C`)
        .setDescription(objeto.resumo)
        .setTitle(`**${objeto.titulo.toUpperCase()}**`)
        .addField(`**REGRAS**`, objeto.regras)
        .addField(`**DATA DO SORTEIO**`, objeto.data, true)
        .addField(`**HORÁRIO**`, objeto.hora, true)
        .setThumbnail(`https://media.discordapp.net/attachments/612399243520639016/737753561164939324/LogoTSGB.png`)
        .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky`, `https://i.ibb.co/3vwKKCT/Disocod-Logo.png`);
    
    if (objeto.imagem !== null) 
        embed.setImage(objeto.imagem);
    
    return sala.send(embed);
}


async function coletarDados(sala) {

    let atributos  = {},
        filtro  = f => !f.author.bot;

    await sala.send(`Qual é o título do seu sorteio?`)
    .then( titulo => {
        let coletor = new Discord.MessageCollector(sala, filtro);

            coletor.on('collect', async (msg, col) => {
                if(msg.content !== undefined)
                    coletor.stop();
            })

            coletor.on('end', async coletado => {
                atr.titulo = await coletado.first().content;
                
                 await sala.send(`Descrição/resumo do sorteio:`)
                .then( resumo => {
                    let filtro   = f2 => !f2.author.bot;
                        coletor2 = new Discord.MessageCollector(sala, filtro);
                
                    coletor2.on('collect', async (msg,col) => {
                        if (msg.content !== undefined)
                            coletor2.stop();
                    })

                    coletor2.on('end', async coletado => {
                        atr.resumo = await coletado.first().content;
                        
                         await sala.send(`Regras do sorteio`)
                        .then( regras => {
                            let filtro   = f3 => !f3.author.bot;
                                coletor3 = new Discord.MessageCollector(sala, filtro);
                        
                            coletor3.on('collect', async (msg,col) => {
                                if (msg.content !== undefined)
                                    coletor3.stop();
                            })
                            coletor3.on('end', async coletado => {
                                atr.regras = await coletado.first().content;
                                
                                 await sala.send(`Qual será a data do sorteio?`)
                                .then( data => {
                                    let filtro   = f4 => !f4.author.bot;
                                        coletor4 = new Discord.MessageCollector(sala, filtro);
                                
                                    coletor4.on('collect', async (msg,col) => {
                                        if (msg.content !== undefined)
                                            coletor4.stop();
                                    })
                                    coletor4.on('end', async coletado => {
                                        atr.data = await coletado.first().content;
                                        
                                         await sala.send(`E qual horário? (Formato 24h)`)
                                        .then( hora => {
                                            let filtro   = f5 => !f5.author.bot;
                                                coletor5 = new Discord.MessageCollector(sala, filtro);
                                        
                                            coletor5.on('collect', async (msg,col) => {
                                                if (msg.content !== undefined)
                                                    coletor5.stop();
                                            })
                                            coletor5.on('end', async coletado => {
                                                atr.hora = await coletado.first().content;
                                                
                                                let msg    = await sala.send(`Quer adicionar uma imagem/gif ? (Sim/Não)`),
                                                    filtro = resp => [`sim`,`não`,`s`,`n`,`nao`].includes(resp.content.toLowerCase());
                                                
                                                 msg.channel.awaitMessages(filtro, {max:1, time: 5000})
                                                .then( async confirmacao => {

                                                    const conf = await confirmacao.first();

                                                    let resposta = conf.content;
                                                    
                                                    if ([`n`,`nao`,`não`].includes(resposta.toLowerCase())) {
                                                        atr.imagem = null;
                                                        printar(sala, atr);
                                                          
                                                    } 
                                                    else {
                                                         await sala.send(`Por gentileza, faça upload da imagem ou gif.`)
                                                        .then( imagem => {
                                                            let filtro   = f7 => !f7.author.bot,
                                                                coletor7 = new Discord.MessageCollector(sala, filtro);

                                                            coletor7.on('collect', async (msg,col) => {
                                                                let atch = await msg.attachments.first(1);
                                                                if (atch[0] != undefined)
                                                                    coletor7.stop();
                                                            })

                                                            coletor7.on('end', async coletado => {
                                                                atr.imagem = await coletado.first().attachments.first().proxyURL;
                                                                printar(sala, atr);

                                                            })
                                                        }) // Imagem
                                                    }
                                                }) // confirmacao
                                                .catch( () => sala.delete() );
                                            })
                                        }) // Hora do sorteio
                                    })
                                }) // Data do sorteio
                            })
                        }) // Regras
                    }) 
                }) // Resumo
            })
    }) // Título
}
