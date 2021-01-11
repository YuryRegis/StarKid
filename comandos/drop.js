const { dbAddDrop, dbListDrops } = require('../Routes/rotaDrop');


class Drop {
    constructor (id=0, drop='') {
        this.id = id,
        this.drop = drop
    }
}


exports.run = async (client, message, args) => {
    message.delete();
    message.reply("Comando desabilitado temporariamente")
        .then(m => m.delete({ timeout: 1500 }))
    return;

    const concurso = args[0],
          chave    = args[1],
          autor    = message.author,
          salaLog  = await message.guild.channels.get('698758957845446657'), 
          perm     = await message.member.roles.some(r => r.name === "Admin") || 
                           message.member.roles.some(r => r.name === "Staff");
    
    if(!perm) 
        return message.reply(`Sinto muito, você não possui permissão para este comando.`);

    if(concurso === 'h' || concurso === 'ajuda' || concurso === undefined)
        return message.reply('Comando drop: `!drop <concurso> <chave>`');
    
    if(args[0] === 'lista') {
        let lista    = await dbListDrops(),
            dropMsg  = '',
            mensagem = `${autor} Aqui esta a lista dos Drops gerados:\n`;
        
        if(lista.lenght === 0)
            return salaLog.send(`${autor} não existem drops no banco de dados.`);

        lista.forEach(drop => { dropMsg += `${drop.drop}#${drop.id}`; });

        mensagem += `\`\`\`${dropMsg}\`\`\``;
        
        return salaLog.send(mensagem);
    }
        
    if(isNaN(concurso) || chave === undefined)
        return message.reply('Argumentos inválidos, use `!drop ajuda` para ajuda.');
    
    let drop = new Drop(concurso, chave);

    await dbAddDrop(drop);

    return salaLog.send(`${autor} seu drop para o concurso ${concurso} foi registrado com sucesso.`);
}

exports.help = {
    name: "drop"
}
    