const { dbAddVIP, dbEditVIP, dbListVIPs } = require('../Routes/rotaCadastroVIP'),
      { geraCupom, ticket, messageDM }    = require('./assets/loto/ticket'),
      { dbFindPasse, dbAddPasse }         = require('../Routes/rotasPasse');


class Apoiador {
    constructor (id=0, nome='', cupom='', concurso='', avatar='', dia=1) {
        this.id = id,
        this.dia = dia,
        this.nome = nome,
        this.cupom = cupom,
        this.avatar = avatar,
        this.concurso = concurso
    }
}


exports.run = async (client, message, args) => {
    await message.delete();

    const salaAtual  = message.channel,
          vipID      = '701655470141603911',
          vipOuroID  = '706706714766082060',
          vipPrataID = '706706548998668370',
          membroAlvo = message.mentions.members.first(),
          salaLogs   = client.channels.get("698758957845446657"),
          salaBot    = client.channels.get("634200679224967188"),
          chatGeral  = client.channels.get("603723288757403648");

    const concursoID = args[1],
          sorteio    = args[2],
          nivel      = args[4],
          quantidade = parseInt(args[3]);

    
    if(args.length < 4) {
        if(args[0] === 'h' || args[0] === 'ajuda')
            return salaAtual.send('\`!cupom @menção concurso sorteio quantidade\`');
        return salaAtual.send('Faltando argumento: \`!cupom @menção concurso sorteio quantidade\`')
    }
    
    if(membroAlvo===undefined)
        return salaAtual.send('Erro: Faltou mencionar o membro para quem devo enviar o cupom.')
    
    if(isNaN(concursoID))
        return salaAtual.send(`Erro: ${concursoID} não é um número do concurso válido.`)
    
    if(!isNaN(sorteio))
        return salaAtual.send(`Erro: ${sorteio} não é um nome de sorteio válido.`)

    if(isNaN(quantidade))
        return salaAtual.send(`Erro: ${quantidade} não é um número válido para quantidade de cupons.`)
    

    let err = false;
    membroAlvo.send('Em breve você irá receber os cupons, cargo e benefícios pelo seu **apoio**. Muito Obrigado!')
        .then()
        .catch(error => {
            salaLogs.send(`!cupom error: Não é possível enviar DM \`\`\`${error}\`\`\``);
            message.channel.send(`${membroAlvo} você precisa liberar mensangens privadas para receber seus cupons. Procure a Admin.`);
            console.log(error);
            err = true;
        })
    if(err) return;

    let aux = 1;
    do {
        let cupom     = geraCupom(),
            existente = await dbFindPasse(cupom),
            dia       = new Date().getDate();
        
        while (existente !== undefined) {
            cupom     = geraCupom();
            existente = await dbFindPasse(cupom);
        }
        
        let apoiador = new Apoiador(
            membroAlvo.id, 
            membroAlvo.displayName,
            cupom, 
            concursoID, 
            membroAlvo.user.displayAvatarURL,
            dia
        );
        salaLogs.send(`Cupom ${sorteio}\`\`\`Nome:     ${apoiador.nome}\nCupom:    ${apoiador.cupom}\nConcurso: ${apoiador.concurso}\`\`\``);

        await dbAddPasse(apoiador); //LowDb grava dados mas nao atualiza arquivo
        // await message.guild.channels.get('634200679224967188').send('!atualizapassedb') //Gambiarra, LowDB não grava dados sem atualizar?
        await ticket(cupom, sorteio);

        membroAlvo.send( await messageDM(apoiador, sorteio) );
        
        if(aux===1)
            chatGeral.send(`${membroAlvo} seus cupons para o sorteio do concurso ${concursoID} foram enviados por mensagem privada. Boa Sorte! 🍀`,
                {file: 'https://acegif.com/wp-content/gifs/boa-sorte-17.gif'})

        aux++
    } while (aux <= quantidade);
    
    let membroVip = membroAlvo.roles.some(role => 
            role.id === vipID || role.id === vipPrataID || role.id === vipOuroID);
        

    if(nivel !== undefined) {
        let vip = '';
        (nivel==='vip') ? vip = vipID : (nivel==='prata') ? vip = vipPrataID : (nivel==='ouro') ? vip = vipOuroID : vip = null;

        if(vip === null)
            return salaLogs.send(`${message.author} ${nivel} não é um cargo válido, coloque o cargo manualmente.`);

        let cargo = await message.guild.roles.get(vip);

        if(!membroVip) {
            membroAlvo.addRole(cargo)
                .then( () => {
                    if(vip==='prata' || vip==='ouro')
                        membroAlvo.addRole('695833895848902677') //DiscordBeta
                            .then().catch(error => { 
                                salaLogs.send(`!cupom: erro ao add cargo\`\`\`${error}\`\`\``);
                                console.log(error) });

                    if(vip==='ouro')
                        membroAlvo.addRole('704448465853349979') //GarticMod
                            .then().catch(error => { 
                                salaLogs.send(`!cupom: erro ao add cargo\`\`\`${error}\`\`\``);
                                console.log(error) });
                })
                .catch(error => { 
                    salaLogs.send(`!cupom: erro ao add cargo\`\`\`${error}\`\`\``);
                    console.log(error)
                });
            }
    }//if nivel
        
    if(membroVip && nivel !== undefined) { //renova ou adiciona data de expiração VIP
        let dia = new Date().getDate(),
            mes = new Date().getMonth() + 1 ,
         filtro = f => f.id === membroAlvo.id,
         VIPs   = await dbListVIPs(),
         vip    = nivel;
    
        VIPs = VIPs.filter(filtro);
        (dia === 31) ? dia = 30 : dia;
        
        if(VIPs.length === 0)
            return;

        VIPs.forEach( async element => 
            await dbEditVIP(element.id, vip, dia, mes) );
    } else {
                    
        let dia = new Date().getDate(),
            mes = new Date().getMonth() + 1 ,
            vip = '';

        (dia === 31) ? dia = 30 : dia;
        (nivel === undefined) ? vip = 'vip' : vip = nivel.toLowerCase();

        await salaBot.send(`!addvip ${membroAlvo} ${dia} ${mes} ${vip}`);
    }
    return;
}


exports.help = {
    name: "cupom"
}
