const Discord = require("discord.js");


exports.run = async (client, message, args) => {
    message.delete();
    
    let autor   = message.author,
        tag     = 'p_' + autor.tag + '🔐',
        info    = `${autor} você criou um chat **privado**🔐 com <@&697930725529485362>, <@&607754714100269056> e <@&607776618064248843>. `;
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
        },
        {
            id: '697930725529485362',
            allow: ['VIEW_CHANNEL'],
        },
        {
            id: '607754714100269056',
            allow: ['VIEW_CHANNEL'],
        },
        {
            id: '607776618064248843',
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