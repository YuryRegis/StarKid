const { dbListPasses, dbDeletePasse } = require('../Routes/rotasPasse');
      

exports.run = async (client, message, args) => {
    message.delete();
    message.reply("Comando desabilitado temporariamente")
        .then(m => m.delete({ timeout: 1500 }))
    return;
    await message.delete();

    const concurso = args[0],
          salaLogs = await message.guild.channels.get('698758957845446657');

    if(concurso === 'h' || concurso === 'ajuda')
        return message.reply('`!rmvConcurso concurso`');

    let filtro = f => f.concurso === concurso,
        cupons = dbListPasses();

    cupons = cupons.filter(filtro);
    
    if(cupons.length===0)
        return salaLogs.send(`${message.author} não encontrei cupons para o concurso ${concurso}`);
    
    cupons.forEach(async element => await dbDeletePasse(element.cupom) );

    salaLogs.send(`Cupons do concurso ${concurso} removidos com sucesso.`);

}


exports.help = {
    name: "rmvconcurso"
}
