const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../funcoes.js");

const opcoes = ["🌎","🚀", "🍎", "🤖"]

exports.help = {
    name: "cargo"
}

exports.run = async (client, message, args) => {
    
        
    const embed = new RichEmbed();
    embed.setTitle("****ThatSkyGameBrasil - CARGOS****");
    embed.setColor("RANDOM");
    embed.setThumbnail("https://i.ibb.co/2N4tGdY/Screen-Shot-2019-10-14-at-17-02-57.png");
    embed.setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    embed.setDescription("Escolha um cargo clicando na reação correspondente:\n") 
    embed.addField("**Cargos**","🌎 - Global \n🚀 - Jogador Beta \n🍎 - Apple \n🤖 - Android");
    embed.setTimestamp();

    //Envia mensagem richEmbed
    const m = await message.channel.send(embed);
    //Adiciona reações e aguarda 30 segundos por uma escolha do usuário
    const cargoEscolhido = await promptMessage(m, message.author, 30, opcoes);

    if (cargoEscolhido === `🚀`){
        var chave = "Beta";
    } else if (cargoEscolhido === `🍎`) {
        var chave = "Apple";
    } else if (cargoEscolhido === `🤖`) {
        var chave = "Android";
    }else if (cargoEscolhido === `🌎`) { 
        var chave = "Global"
    } else {
        embed.addField("**CARGO NÃO DEFINIDO**",`Use o comando \`!cargo\` novamente.`);
        m.edit(embed);
        message.delete();
        return m.delete(15000)
    }; // retorna nada para caso de emoji diferente
    
    var cargo = await message.guild.roles.find(role => role.name.toLowerCase() === chave.toLowerCase());
    var member = message.guild.members.find(member => member.id === message.author.id);

    if (cargo == null) { // Caso não exista o cargo com o valor de chave passado
        embed.addField(`CARGO ${chave.toUpperCase()} NAO ENCONTRADO`)
        m.edit(embed)
        message.delete()
        return m.delete(15000)
    }

    // se o membro ja tiver o cargo selecionado, apague o mesmo
    if (member.roles.some(x => x.name === cargo.name)) {
        member.removeRole(cargo.id)
        .then(member => console.log(`${member.user.username} removeu o cargo ${cargo.name}`))
        .catch(err => console.log(err));
        embed.addField("**\nREMOVIDO**",
        `${member.user.username} removeu o cargo ${cargo.name}\n` +
        `Use o comando \`!cargo\` novamente para adicionar ou remover outro cargo.`);
    } else { // caso contrario, adicione cargo selecionado
        member.addRole(cargo.id).then(member => {
            var nome = member.user.username;
            console.log(`${nome} adicionou o cargo ${chave}`);       
        }).catch(err => console.error);
        embed.addField("**\nADICIONADO**",
        `${member.user.username} adicionou o cargo ${cargo.name}\n` +
        `Use o comando \`!cargo\` novamente para adicionar ou remover outro cargo.`);
    }

    m.edit(embed);
    message.delete();
    m.delete(40000);
    return 
}

    
