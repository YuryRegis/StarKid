const {MessageEmbed}  = require("discord.js"),
      {promptMessage} = require("../funcoes.js"),
      {verificaPerm}  = require('../funcoes/members');

const opcoes = ["🏔","📜","✂"],
      getID  = require('../funcoes/ids.json');

exports.run = async (client, message, args) => {
    
    const perm = await verificaPerm(message.member);
    if(message.channel.id != getID.sala.FLOOD && !perm){
        return message.channel.send(`Este comando não é permitido nesse canal. 
        Use o canal <#${getID.sala.FLOOD}>, por gentileza.`)
    }

    const embed = new MessageEmbed();
    embed.setColor("ORANGE");
    embed.setThumbnail("https://i.ibb.co/nD0SV4r/ppt.png");
    embed.setTitle("**PEDRA 🆚 PAPEL 🆚 TESOURA**");
    embed.setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    embed.setDescription("Você irá jogar pedra-papel-tesoura com o StarKid!\nEscolha:\n\n" +
                        "🏔 - Para pedra\n📜 - Para papel\n✂ - Para tesoura" +
                        "\n\nUse a reação de sua escolha 👇🏽")
    embed.setTimestamp();

    const jogador = message.author.username.toUpperCase()
    const m = await message.channel.send(embed);
    const minhaEscolha = await promptMessage(m, message.author, 30, opcoes);
    // Escolha aleatória do bot dentre as opções
    const escolhaDoBot =  opcoes[Math.floor(Math.random() * opcoes.length)];
    
    if( minhaEscolha === undefined ) {
        embed.addField("TEMPO ESGOTADO", 
        `${message.author} seu tempo para escolher acabou!`)
    } else if((minhaEscolha === "🏔" && escolhaDoBot === "✂") ||
        (minhaEscolha === "✂" && escolhaDoBot === "📜") || 
        (minhaEscolha === "📜" && escolhaDoBot === "🏔")) {
            embed.addField(`**${jogador} GANHOU !!!**`, `${minhaEscolha} 🆚 ${escolhaDoBot}`);        
        } else if (minhaEscolha === escolhaDoBot) {
            embed.addField("**EMPATE !!!**", `${minhaEscolha} 🆚 ${escolhaDoBot}`);
       } else embed.addField(`**${jogador} PERDEU PARA STARKID !!!**`, `${minhaEscolha} 🆚 ${escolhaDoBot}`);
    
    return m.edit(embed)
}

exports.help = {
    name: "ppt"
}