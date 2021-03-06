const megasena = require('./assets/loto/megasena'),
{ messageEmbed, ticket } = require('./assets/loto/ticket');


exports.run = async (client, message, args) => {
    message.delete();
    message.reply("comando desativado").delete(1500);
    return;
    await message.delete();

    const salaAlvo = message.guild.channels.cache.get('603724150275702835');

    if(isNaN(args[0]))
        return message.reply('Digite o numero de concurso.');
    
    if(args[1]===undefined)
        return message.reply('Digite qual sorteio você deseja (Passe.Av, Nitro.Cls, NITRO)');

    const gerador = num => (num[1]===undefined) ? num = num[0] : num = num[1];

    let resposta = await megasena(args[0]),
        sorteio  = resposta.resultadoOrdenado.split('-'),
        cupom    = sorteio.map(gerador).join("");
    
    await ticket(cupom, args[1]);

    let aviso = await messageEmbed(cupom, args[1], resposta);

    salaAlvo.send(aviso)
}   


exports.help = {
    name: "sorteio"
}


