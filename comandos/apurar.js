const { dbListPasses, dbDeletePasse } = require('../Routes/rotasPasse'),
      { vencedor } = require('./assets/loto/ticket');


exports.run = async (client, message, args) => {
    await message.delete();

    const concurso  = args[0],
          premiado  = parseInt(args[1]),
          titulo    = args[2],
          remover   = args[3] || false,
          salaAlvo  = await message.guild.channels.get('603724150275702835'),
          salaLogs  = await message.guild.channels.get('698758957845446657'),
          mencoesID = ['627270660271374387','627275771710406673','627273901197492244','653331984420175903'];

    if(concurso === 'h' || concurso === 'ajuda')
        return message.reply('`!apurar concurso cupomGerado tituloSorteio`');
    
    if(isNaN(concurso))
        return message.reply('`!apurar concurso cupomGerado tituloSorteio <rmv bool>`');
    
    if(isNaN(premiado))
        return message.reply('`Faltou informar cupom premiado\n!apurar concurso cupomGerado tituloSorteio <rmv bool>`');

    let filtro = f => f.concurso === concurso,
        cupons = dbListPasses(),
        auxMbr = {},
        maisPx = 0,
        aux    = 0;

    cupons = cupons.filter(filtro);
    
    if(cupons.length===0)
        return salaLogs.send(`${message.author} não encontrei cupons para o concurso ${concurso}`);

    cupons.forEach(element => { 
        let cupom = parseInt(element.cupom);   

        (premiado > cupom) ? aux = premiado - cupom : aux = cupom - premiado;
        
        if(maisPx===0) {
            maisPx = aux;
            auxMbr = element;
        }
        else if(aux < maisPx) {
            maisPx = aux;
            auxMbr = element;
        }
        else if(aux === maisPx)
            (cupom < auxMbr.cupom) ? auxMbr = auxMbr : auxMbr = element
    });
    
    cupons.forEach(element => {
        element.cupom = parseInt(element.cupom);
        if(element.cupom === premiado)
            auxMbr = element;
    });

    let mensagem = await vencedor(auxMbr, titulo),
        mencoes  = '';
    
    mencoesID.forEach(mencao => mencoes += `<@&${mencao}> `);

    await salaAlvo.send(mencoes)
        .then()
        .catch(e=>salaLogs.send(`!apurar error\`\`\`${e}\`\`\``));
        
    await salaAlvo.send(mensagem);
    await salaLogs.send(`Sorteio ${titulo} apurado\`\`\`Nome:  ${auxMbr.nome}\nCupom: ${auxMbr.cupom}\`\`\``);

    if(remover==='true'|| concurso === 'rmv') {
        cupons.forEach(async element => await dbDeletePasse(element.cupom) );
        salaLogs.send(`Cupons do concurso ${concurso} removidos com sucesso.`);
    }

}


exports.help = {
    name: "apurar"
}
