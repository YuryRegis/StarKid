const { dbListVIPs, dbDeleteVIP } = require('../Routes/rotaCadastroVIP');
      

exports.run = async (client, message, args) => {
    await message.delete();

    const id       = message.mentions.members.first().id || args[0],
          alvo     = await message.guild.members.get(id),
          salaLogs = await message.guild.channels.get('698758957845446657'),
          vipIDs   = ['701655470141603911', '706706548998668370', '706706714766082060'];

    if(id === 'h' || id === 'ajuda')
        return message.reply('`!rmvvid id` ou `!rmvvid @menção`');

    let filtro     = f => f.id === id,
        membrosvip = dbListVIPs();

    membrosvip = membrosvip.filter(filtro);
    
    if(membrosvip.length===0)
        return salaLogs.send(`${message.author} não encontrei membro vip para o id ${id}`);
    
    membrosvip.forEach(async element => await dbDeleteVIP(element.id) );

    vipIDs.forEach(id => {
        if(alvo.roles.some(cargo => cargo.id === id))
            alvo.removeRole(id)
    })

    salaLogs.send(`Vip id ${id} removido com sucesso.`);

}


exports.help = {
    name: "rmvvip"
}
