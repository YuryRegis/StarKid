const { dbListPasses, dbDeletePasse } = require('../Routes/rotasPasse');
      

exports.run = async (client, message, args) => {
    message.delete();
    message.reply("Comando desabilitado temporariamente")
        .then(m => m.delete({ timeout: 1500 }))
    return;
    await message.delete();

    const cupom = args[0],
          salaLogs = await message.guild.channels.get('698758957845446657');

    if(cupom === 'h' || cupom === 'ajuda')
        return message.reply('`!rmvcupom cupom`');

    let filtro = f => f.cupom === cupom,
        cupons = dbListPasses();

    cupons = cupons.filter(filtro);
    
    if(cupons.length===0)
        return salaLogs.send(`${message.author} não encontrei o cupom ${cupom}`);
    
    cupons.forEach(async element => await dbDeletePasse(element.cupom) );

    salaLogs.send(`Cupom ${cupom} removido com sucesso.`);

}


exports.help = {
    name: "rmvcupom"
}
