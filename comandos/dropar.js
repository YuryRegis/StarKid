const { dbListDrops } = require('../Routes/rotaDrop');


exports.run = async (client, message, args) => {
    const chave = args[0],
          drops = await dbListDrops();

    if(chave === undefined)
        return message.reply('Para dropar um cupom de sorteio, você precisa informar uma chave válida.');
    
    let filtro = f => f.drop === chave,
        drop   = drops.filter(filtro);
    
    if(!drop[0])
        return message.reply('Chave já resgatada ou inválida.');
    else {
        
    }
    
}


exports.help = {
    name: "dropar"
}
    