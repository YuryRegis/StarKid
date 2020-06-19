const { dbAddDrop } = require('../Routes/rotaDrop');


class Drop {
    constructor (id=0, drop='') {
        this.id = id,
        this.drop = drop
    }
}


exports.run = async (client, message, args) => {
    const concurso = args[0],
          chave    = args[1],
          salaLog  = await message.guild.channels.get('698758957845446657'), 
          perm     = await message.member.roles.some(r => r.name === "Admin") || 
                           message.member.roles.some(r => r.name === "Staff");
    
    if(!perm) 
        return message.reply(`Sinto muito, você não possui permissão para este comando.`);

    if(concurso === 'h' || concurso === 'ajuda' || concurso === undefined)
        return message.reply('Comando drop: `!drop <concurso> <chave>`');
    
    if(isNaN(concurso) || chave === undefined)
        return message.reply('Argumentos inválidos, use `!drop ajuda` para ajuda.');
    
    let drop = new Drop(concurso, chave);

    await dbAddDrop(drop);

    return message.delete();
}

exports.help = {
    name: "drop"
}
    