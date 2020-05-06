const { dbListVIPs } = require('../Routes/rotasVIP'),
      { RichEmbed }  = require('discord.js');


exports.help = {
    name: "vips"
}

exports.run = async function(client, message, args) {

    const floodID   = '653744153171066880',
          listaVips = await dbListVIPs(),
          ano       = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
                       'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO','NOVEMBRO', 'DEZEMBRO'];

    if(message.channel.id !== floodID) 
        return message.delete();
    
    let listaOuro  = listaVips.filter( f => f.vip === 'ouro'),
        listaPrata = listaVips.filter(f => f.vip === 'prata'),
        listaVip   = listaVips.filter( f => f.vip === 'vip' ),
        mes        = new Date().getMonth(),
        embed      = new RichEmbed(),
        prata      = '',
        ouro       = '',
        vip        = '';

    if(listaVips.length === 0)
        return message.channel.send('Ainda não temos nenhum mebro VIP neste mês.');
    
    listaVip.forEach(apoiador => vip += ` **${apoiador.nome}** |` );
    listaOuro.forEach(apoiador => ouro += ` **${apoiador.nome}** |`);
    listaPrata.forEach(apoiador => prata += ` **${apoiador.nome}** |`);

    embed
        .setTimestamp()
        .setColor('#ffff53')
        .setTitle(`V.I.P's DO MÊS DE ${ano[mes]}`)
        .setThumbnail('https://phoneky.co.uk/thumbs/screensavers/down/technology/vip_94tjc3hn.gif')
        .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky`, 
            'https://s3.amazonaws.com/assets.apoia.se/campaigns/5db49c70e2d7737c4cd4e520%7C5db49c99193385a323d53d4c/user-campaign-about-photo%7CDisocodLogo-20200502_23062002.png');

    if(listaOuro.length !== 0)
        (ouro.length > 1024) ? ouro = ouro.slice(0,1023) : ouro;
        embed.addField('V.I.P - OURO', ouro, false);

    if(listaPrata.length !== 0)
        (prata.length > 1024) ? prata = prata.slice(0,1023) : prata;
        embed.addField('V.I.P - PRATA', prata, false);

    if(listaVip.length !== 0)
        (vip.length > 1024) ? vip = vip.slice(0,1023) : vip;
        embed.addField('V.I.P', vip, false);
    
    let sala = await message.guild.channels.get(floodID);
    sala.send(embed);
}