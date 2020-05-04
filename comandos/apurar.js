const { dbListPasses, dbDeletePasse } = require('../Routes/rotasPasse'),
      { vencedor } = require('./assets/loto/ticket');


exports.run = async (client, message, args) => {
    await message.delete();

    const concurso = args[0],
          premiado = parseInt(args[1]),
          titulo   = args[2],
          remover  = args[3] || false,
          salaAlvo = await message.guild.channels.get('603724150275702835'),
          salaLogs = await message.guild.channels.get('698758957845446657');

    if(concurso === 'h' || concurso === 'ajuda')
        return message.reply('`!apurar concurso cupomGerado`');

    let filtro = f => f.concurso === concurso,
        cupons = dbListPasses(),
        auxMbr = {},
        maisPx = 0,
        aux    = 0;

    cupons = cupons.filter(filtro);
    
    if(cupons.length===0)
        return salaLogs.send(`${message.author} não encontrei cupons para o concurso ${concurso}`);

    cupons.forEach(element => { 
        element.cupom = parseInt(element.cupom);   
        (premiado > element.cupom) ? aux = premiado - element.cupom : aux = element.cupom - premiado;

        if(maisPx===0) {
            maisPx = aux;
            auxMbr = element;
        }
        else if(aux < maisPx) {
            maisPx = aux;
            auxMbr = element;
        }
        else if(aux === maisPx)
            (element.cupom > auxMbr.cupom) ? auxMbr = auxMbr : auxMbr = element
    });
    
    cupons.forEach(element => {
        element.cupom = parseInt(element.cupom);
        if(element.cupom === premiado)
            auxMbr = element;
    });

    let mensagem = await vencedor(auxMbr, titulo);
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
