const { MessageEmbed } = require("discord.js"),
      { verificaPerm } = require('../funcoes/members'),
                 getID = require('../funcoes/ids.json');

exports.help = {
    name: "rank"
}

exports.run = async (client, message, args) => {
    
    const flood = client.channels.cache.get(getID.sala.FLOOD),
          perm  = await verificaPerm(message.member);

    if(message.channel.id != flood.id && !perm){
        return message.channel.send(`Este comando não é permitido nesse canal. 
        Use o canal ${flood}, por gentileza.`)
    }
    
    const guild = message.guild;
    var rank = "";

    let arr = guild.members.cache.array(); // Cria um array de todos os membros
    arr.sort((a, b) => a.joinedAt - b.joinedAt); // Organizando por data de entrada

    for (let i = 0; i < arr.length; i++) { 
      rank += `${i+1} - ${arr[i]}\n`
    }
    const embed = new MessageEmbed()
        .setTitle('ThatSkyGameBrasil')
        .setFooter(`Requisitado por ${message.member.user.username}`, client.user.displayAvatarURL)
        .setTimestamp()
        .setColor("RANDOM")
        .addField("Registros - Rank", rank.substring(0, 1024))
   
    m = await message.channel.send(embed);
    message.delete() 
    m.delete({timeout:30000})
}