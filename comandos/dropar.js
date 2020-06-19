const { dbListDrops, dbDeleteDrop } = require('../Routes/rotaDrop');


exports.run = async (client, message, args) => {
    const chave    = args[0],
          autor    = message.author,
          drops    = await dbListDrops(),
          salaBot  = await message.guild.channels.get('634200679224967188'),
          salaLogs = await message.guild.channels.get('698758957845446657');

    if(chave === undefined)
        return message.reply('Para dropar um cupom de sorteio, você precisa informar uma chave válida.');
    
    if(drops.lenght === 0)
        return message.reply('Chave já resgatada ou inválida...');
    
    let filtro = f => f.drop === chave,
        drop   = drops.filter(filtro);
    
    drop = drop[0];
    
    if(!drop)
        return message.reply('Chave já resgatada ou inválida.');
    else {
        await dbDeleteDrop(drop.id);
        salaBot.send(`!cupom ${autor} ${drop.id} passe.av 1`);
        salaLogs.send(`${autor.tag} resgatou um cupom com a chave ${chave}.`); 
    }
    
}


exports.help = {
    name: "dropar"
}
    
