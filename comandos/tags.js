const { MessageEmbed } = require("discord.js");
const getID = require('../funcoes/ids.json');
const { promptMessage } = require("../funcoes.js");
const { verificaPerm } = require('../funcoes/members');

const opcoes = [`👤`,`👥`,`👑`,`🤠`,`🎹`,`🎨`,`🔰`,`🗺️`,`🧢`,`🧚`,`🤳`,`🎒`,`❤️`,`💍`,`💍`,`😄`,`💋`, `💙`,`🧓`,`🃏`]

exports.help = {
    name: "tags"
}

exports.run = async (client, message, args) => {
    
    const flood    = client.channels.cache.get(getID.sala.FLOOD),
          salaLogs = client.channels.cache.get(getID.sala.LOGS);

    const perm = await verificaPerm(message.member);

    if(message.channel.id != flood.id && !perm){
        return message.channel.send(`Este comando não é permitido nesse canal. 
    Use o canal ${flood} , por gentileza.`)
    }

    const embed = new MessageEmbed();
    embed.setTitle("**ThatSkyGameBrasil - TAGS**");
    embed.setColor("RANDOM");
    embed.setThumbnail("https://image.freepik.com/vetores-gratis/tag-neon-verde-noite-brilhante-elemento-de-propaganda_1262-13490.jpg");
    embed.setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    embed.setDescription("Escolha **uma** TAG clicando na reação correspondente:\n") 
    embed.addField("**Tags Customizáveis**","👤 - Jogador Solo \n👥 - Formador de grupos \n"    +
    "👑 - Colecionador \n🤠 - Explorador \n🎹 - Músico Skyniano \n🎨 - Desenhista / Pintor \n"  +
    "🔰 - Veterano \n🗺️ - Guia Turístico \n🧢 - Turista \n🧚 - Ajudante \n🎒 - Carregado \n"    +
    "❤️ - Trocador \n🤳 - YouTuber\n💍 - Casado\n😄 - Solteiro\n💋 - Namorando\n💙 - Capa azul\n"+
    "🧓 - Elder \n🃏 - UNO")
    embed.setTimestamp();

    //Envia mensagem richEmbed
    const m = await message.channel.send(embed);
    //Adiciona reações e aguarda 30 segundos por uma escolha do usuário
    const cargoEscolhido = await promptMessage(m, message.author, 30, opcoes);

    if (cargoEscolhido === `👤`) {
        var chave = "Jogador Solo"
    } else if (cargoEscolhido === `👥`) {
        var chave = "Formador de Grupos"
    } else if (cargoEscolhido === `👑`) {
        var chave = "Colecionador"
    } else if (cargoEscolhido === `🤠`) {
        var chave = "Explorador"
    } else if (cargoEscolhido === `🤠`) {
        var chave = "Músico Skyniano"
    } else if (cargoEscolhido === `🎨`) {
        var chave = "Desenhista / Pintor"
    } else if (cargoEscolhido === `🔰`) {
        var chave = "Veterano"
    } else if (cargoEscolhido === `🗺️`) {
        var chave = "Guia Turístico"  
    } else if (cargoEscolhido === `🧢`) {
        var chave = "Turista" 
    } else if (cargoEscolhido === `🧚`) {
        var chave = "Ajudante"
    } else if (cargoEscolhido === `🎒`) { 
        var chave = "Carregado"
    } else if (cargoEscolhido === `❤️`) { 
        var chave = "Trocador"
    } else if (cargoEscolhido === `🤳`) {
        var chave = "🚩  🆈🅾🆄🆃🆄🅱🅴🆁"
    } else if (cargoEscolhido === "💍") {
        var chave = "Casado"
    } else if (cargoEscolhido === "😄") {
        var chave = "Solteiro"
    } else if (cargoEscolhido === "💋") {
        var chave = "Namorando"
    } else if (cargoEscolhido === "💙") {
        var chave = "Capa azul"
    } else if (cargoEscolhido  === `🧓`) {
        var chave = "Elder"
    } else if (cargoEscolhido  === `🃏`) {
        var chave = "UNO"
    }
    else {
        embed.addField("**TAG NÃO DEFINIDA**",`Use o comando \`!tags\` novamente.`);
        m.edit(embed);
        message.delete();
        return m.delete(15000)
    }; // retorna nada para caso de emoji diferente
    
    var cargo  = await message.guild.roles.cache.find(role => role.name.toLowerCase() === chave.toLowerCase());
    var member = await message.guild.members.cache.find(member => member.id === message.author.id);

    if (cargo == null) { // Caso não exista o cargo com o valor de chave passado
        embed.addField(`TAG ${chave.toUpperCase()} NÃO ENCONTRADA`)
        m.edit(embed)
        message.delete()
        return m.delete(15000)
    }

    // se o membro ja tiver o cargo selecionado, apague o mesmo
    if (member.roles.cache.some(x => x.name === cargo.name)) {
        member.roles.remove(cargo.id)
            .then(member => {
                console.log(`${member.user.username} removeu o cargo ${cargo.name}`);
                salaLogs.send(`${member.displayName} removeu o cargo ${cargo.name}`);  
            })
            .catch(err => console.log(err));
        
        embed.addField("**\nREMOVIDO**",
            `${member.user.username} removeu o cargo ${cargo.name}\n` +
            `Use o comando \`!cargo\` novamente para adicionar ou remover outro cargo.`);
    } else { // caso contrario, adicione cargo selecionado
        member.roles.add(cargo.id)
            .then(member => {
                var nome = member.user.username;
                console.log(`${nome} adicionou o cargo ${chave}`);
                salaLogs.send(`${nome} adicionou o cargo ${chave}`);       
            })
            .catch(err => console.error);
        
        embed.addField("**\nADICIONADO**",
            `${member.user.username} adicionou a tag ${cargo.name}\n` +
            `Use o comando \`!tags\` novamente para adicionar ou remover outra tag.`);
    }

    m.edit(embed);
    message.delete();
    m.delete({timeout:40000});
    return 
}

    
