const { RichEmbed } = require("discord.js");

exports.help = {
    name: "rank"
}

exports.run = async (client, message, args) => {
    
    const flood = client.channels.get("653744153171066880");

    if(message.channel.id != "653744153171066880" && !message.member.roles.some(r =>  r.name === "Staff" || r.name === "Admin")){
        return message.channel.send(`Este comando não é permitido nesse canal. 
        Use o canal ${flood}, por gentileza.`)
    }
    
    const guild = message.guild;
    var rank = "";

    let arr = guild.members.array(); // Cria um array de todos os membros
    arr.sort((a, b) => a.joinedAt - b.joinedAt); // Organizando por data de entrada

    for (let i = 0; i < arr.length; i++) { 
      rank += `${i+1} - ${arr[i]}\n`
    }
    const embed = new RichEmbed()
        .setTitle('ThatSkyGameBrasil')
        .setFooter(`Requisitado por ${message.member.user.username}`, client.user.displayAvatarURL)
        .setTimestamp()
        .setColor("RANDOM")
        .addField("Registros - Rank", rank.substring(0, 1024))
   
    m = message.channel.send(embed);
    message.delete() 
    m.delete(30000)
}