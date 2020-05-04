const { dbFindPasse, dbAddPasse, dbEditPasse, dbListPasses } = require('../Routes/rotasPasse'),
      { geraCupom, ticket, messageDM }  = require('./assets/loto/ticket');


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
          salaLogs   = client.channels.get("698758957845446657");

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

        await dbAddPasse(apoiador);
        await ticket(cupom, sorteio);

        membroAlvo.send( await messageDM(apoiador, sorteio) );

        aux++
    } while (aux <= quantidade);
    
    let membroVip = membroAlvo.roles.some(role => 
            role.id === vipID || role.id === vipPrataID || role.id === vipOuroID);
        

    if(nivel !== undefined) {
        let vip = '';
        (nivel==='vip') ? vip = vipID : (nivel==='prata') ? vip = vipPrataID : (nivel==='ouro') ? vip = vipOuroID : vip = null;

        if(vip === null)
            return salaLogs.send(`${message.author} ${nivel} não é um cargo válido, use vip, prata ou ouro.`);

        let cargo = await message.guild.roles.get(vip);

        if(!membroVip)
            membroAlvo.addRole(cargo)
                .then()
                .catch(error => { 
                    salaLogs.send(`!cupom: erro ao add cargo\`\`\`${error}\`\`\``);
                    console.log(error)
                });
    }//if nivel
        
    if(membroVip) {
        let dia = new Date().getDate(),
        filtro = f => f.id === membroAlvo.id,
        cupons = dbListPasses();
    
        cupons = cupons.filter(filtro);
        if(cupons.length === 0)
            return;
        cupons.forEach( async element => 
            await dbEditPasse(element, element.cupom, element.concurso, dia) );
    }
    return;
}


exports.help = {
    name: "cupom"
}
