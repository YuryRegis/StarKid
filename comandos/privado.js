const Discord = require("discord.js");


exports.run = async (client, message, args) => {
    message.delete();
    
    let autor   = message.author,
        tag     = 'd_' + autor.tag + '🔐',
        info    = `${autor} você criou um chat **privado**🔐 com @Moderador, @Staff e @Admin. `;
    // let novaRole = await message.guild.createRole({
    //     name: tag,
    //     hoist: false,
    //     mentionable: false,
    // });

    let novaSala = await message.guild.createChannel(tag, {
        type: 'text',
        permissionOverwrites: [{
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
        },
        {
            id: message.author.id,
            allow: ['VIEW_CHANNEL'],
        }]
    })
    
    await novaSala.send({file: 'https://pngimage.net/wp-content/uploads/2018/06/privado-png-2.png'});

    novaSala.send(info + 'O uso indevido deste comando, sem necessidade, irá gerar **advertência** e, em caso de reincidência, sujeito à **banimento**.');

    return;
}

exports.help = {
    name: "privado"
}