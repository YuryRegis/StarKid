const {verificaPerm} = require('../funcoes/members'),
               getID = require('../funcoes/ids.json');

exports.help = {
    name: "id"
}

exports.run = async (client, message, args) => {
    message.delete();
    
    // console.log(args[0].split("@"));
    const perm = await verificaPerm(message.member);
    
    if(perm) {
        let regexSala = /#/;
        let canal = await client.channels.cache.get(getID.sala.LOGS);

        if (regexSala.test(args[0])) {
            let procurado = await message.mentions.channels.first();
            message.author.send(`ID da sala: ${procurado.id}`);
            return canal.send(`ID da sala ${procurado} enviado por DM ${message.author}`);
        }
        
        if (/@/.test(args[0])) {
            let idusuario = args[0].split("@")[1].split(">")[0];
            await message.author.send(`O ID do usuário que deseja é ${idusuario}`);
            return canal.send(`ID enviado por DM ${message.author}`);
        }

        if(!isNaN(args[0])) {
            let alvo = message.channel.guild.members.get(args[0]);
            if (alvo === undefined) return message.reply(`${args[0]} não pertence a nenhum membro.`);
            message.author.send(`ID de ${alvo.displayName}:   ${alvo.id}`);
            let texto = `${message.author.username} localizei um membro com este ID:`
            canal.send(texto+`\`\`\`${alvo.id}:   ${alvo.displayName}\`\`\``);
        }

    } 
    else return message.reply(" você não tem permissão para usar este comando."); 
}
