const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../funcoes.js");

const opcoes = [`👤`,`👥`,`👑`,`🤠`,`🎹`,`🎨`,`🔰`,`🗺️`,`🧢`,`🧚`,`🤳`,`🎒`,`❤️`,`💍`,`💍`,`😄`,`💋`, `💙`,`🧓`,`🃏`]

exports.help = {
    name: "tags"
}

exports.run = async (client, message, args) => {
    
    const flood    = client.channels.get("653744153171066880"),
          salaLogs = client.channels.get("698758957845446657");

    if(message.channel.id != "653744153171066880" && !message.member.roles.some(r =>  r.name === "Staff" || r.name === "Admin")){
        return message.channel.send(`Este comando não é permitido nesse canal. 
    Use o canal ${flood} , por gentileza.`)
    }

    const embed = new RichEmbed();
    embed.setTitle("**ThatSkyGameBrasil - TAGS**");
    embed.setColor("RANDOM");
    embed.setThumbnail("https://image.freepik.com/vetores-gratis/tag-neon-verde-noite-brilhante-elemento-de-propaganda_1262-13490.jpg");
    embed.setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    embed.setDescription("Escolha **uma** TAG clicando na reação correspondente:\n") 
    embed.addField("**Tags Customizáveis**","👤 - Jogador Solo \n👥 - Formador de grupos \n"+
    "👑 - Colecionador \n🤠 - Explorador \n🎹 - Músico Skyniano \n🎨 - Desenhista / Pintor \n" +
    "🔰 - Veterano \n🗺️ - Guia Turístico \n🧢 - Turista \n🧚 - Ajudante \n🎒 - Carregado \n" +
    "❤️ - Trocador \n🤳 - YouTuber\n💍 - Casado\n😄 - Solteiro\n💋 - Namorando\n💙 - Capa azul\n"= +
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
        var chave = "YouTuber"
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
    
    var cargo = await message.guild.roles.find(role => role.name.toLowerCase() === chave.toLowerCase());
    var member = message.guild.members.find(member => member.id === message.author.id);

    if (cargo == null) { // Caso não exista o cargo com o valor de chave passado
        embed.addField(`TAG ${chave.toUpperCase()} NÃO ENCONTRADA`)
        m.edit(embed)
        message.delete()
        return m.delete(15000)
    }

    // se o membro ja tiver o cargo selecionado, apague o mesmo
    if (member.roles.some(x => x.name === cargo.name)) {
        member.removeRole(cargo.id)
            .then(member => {
                console.log(`${member.user.username} removeu o cargo ${cargo.name}`);
                salaLogs.send(`${member.displayName} removeu o cargo ${cargo.name}`);  
            })
            .catch(err => console.log(err));
        
        embed.addField("**\nREMOVIDO**",
            `${member.user.username} removeu o cargo ${cargo.name}\n` +
            `Use o comando \`!cargo\` novamente para adicionar ou remover outro cargo.`);
    } else { // caso contrario, adicione cargo selecionado
        member.addRole(cargo.id)
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
    m.delete(40000);
    return 
}

    
