const { RichEmbed } = require('discord.js');


exports.help = {
    name: "enviarembed"
}


exports.run = async (client, message, args) => {
    await message.delete();
    

    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        const salaLogs = await message.guild.channels.get('698758957845446657'),
              linkTest = /http|https|ftp|ftps|www/g;
              
        let canal  = undefined,
            link   = undefined,
            embed  = new RichEmbed(),
            titulo = args[1].replace(/_/g,' ');
        
        if( !isNaN(args[0]) ) 
            canal = await client.channels.get(args[0]);
        
        if( canal === undefined ) {
            canal = await message.mentions.channels.first();
            if(canal===undefined)
                return salaLogs.send(`${message.author} ${args[0]} não é um canal válido.`);
        }
            
        if(linkTest.test(args[args.length-1])) {
            link = args[args.length-1];
            args.pop();
        }
        
        let descricao = args.slice(2, args.length).join(' ');
        
        embed
            .setTimestamp()
            .setColor('RANDOM')
            .setTitle(titulo)
            .setDescription(descricao)
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky`, 
            'https://s3.amazonaws.com/assets.apoia.se/campaigns/5db49c70e2d7737c4cd4e520%7C5db49c99193385a323d53d4c/user-campaign-about-photo%7CDisocodLogo-20200502_23062002.png');
        
        if(link !== undefined)
            embed.setImage(link);
        
        canal.send(embed).then()
            .catch(error => {
                salaLogs.send(`!enviarembed error\n \`\`\`${error}\`\`\``);
                console.log(`!enviarembed error: ${error}`);
            });
        return;
    } 
    else return message.reply(" você não tem permissão para usar este comando."); 
}
