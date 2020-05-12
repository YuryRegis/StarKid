const { dbListPasses } = require('../Routes/rotasPasse');
      

exports.run = async (client, message, args) => {
    await message.delete();

    const salaLogs = await message.guild.channels.get('698758957845446657'),
          autor    = await message.author,
          consulta = await dbListPasses(),
          sorteio  = args[0];
    
    if(sorteio===undefined || isNaN(sorteio))
        return salaLogs.send(`${message.author} ${sorteio} não é um concurso válido.`);


    let listaPasses = ``,
        filtro      = f => f.concurso === sorteio,
        listaCupons = consulta.filter(filtro);


    listaCupons.forEach(element => listaPasses += `${element.cupom} `);

    if (listaPasses.length === 0)
        salaLogs.send(`${autor}: Nenhum cupom encontrado para o concurso ${sorteio}.`);
    else
        salaLogs.send(`${autor}: Cupons do concurso ${sorteio}\n\`\`\`diff\n${listaPasses}\n\`\`\``);

}


exports.help = {
    name: "listpasses"
}
