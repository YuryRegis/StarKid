const {RichEmbed} = require(`discord.js`);
const {getMember, getRandomInt} = require(`../funcoes.js`);

exports.help = {
    name: "crush"
}

exports.run = async (client, message, args) => {

    const flood = client.channels.get("653744153171066880");
    
    if(message.channel.id != "653744153171066880" && !message.member.roles.some(r =>  r.name === "Staff" || r.name === "Admin")){
        return message.channel.send(`Este comando não é permitido nesse canal. 
    Use o canal ${flood}, por gentileza.`)
    }
    
    if(message.member.id == "355147512216158238") { //Exclusivo da LIV
        const embed = new RichEmbed()
        .setTitle(`SKYNDER`)
        .setDescription(`Calcule a chance de um *match* com seu *crush*.`)
        .setColor(`RANDOM`)
        .setThumbnail("https://media.giphy.com/media/xThtaxm8RQ5koMKKxW/giphy.gif")
        .setTimestamp()
        .addField(`${message.member.displayName} 💞 ${"Harry"}`,  "❤️".repeat(10))
        .setFooter(`Requisitado por ${message.member.displayName}`, client.user.displayAvatarURL)

        return message.channel.send(embed);
    }
    
    var indice = getRandomInt(0,10)
    var progresso = "❤️".repeat(indice) + "💔".repeat(10 - indice);
    var img = ""
    let alvo = getMember(message, args[0]);

    if(!alvo || message.author.id === alvo.id) {
        alvo = message.guild.members
            .filter(membro => membro.id !== message.author.id)
            .random();
    }

    if(alvo.id == "355147512216158238") { //Exclusivo da LIV (zero corações)
        if (message.member.id === "322421000153333761") {
            progresso = "❤️".repeat(10); //Se for o Harry ira dar sempre 10❤️
            indice = 10;
        }
        else {
            progresso = "💔".repeat(10)
            indice = 0;
            if(message.member.id === "549442688219611136"){ //Se o Blu tentar match com Liv
                progresso += "\n\n**Pro Harry tudo e pro Blu nadinha.**"
            }
        }
    }

    if (indice >= 5) {
        img = "https://media.giphy.com/media/xThtaxm8RQ5koMKKxW/giphy.gif"
    } else img = "https://media.giphy.com/media/3oriNM8HF8oijarwre/200w_d.gif"

    const embed = new RichEmbed()
        .setTitle(`SKYNDER`)
        .setDescription(`Calcule a chance de um *match* com seu *crush*.`)
        .setColor(`RANDOM`)
        .setThumbnail(img)
        .setTimestamp()
        .addField(`${message.member.displayName} 💞 ${alvo.user.username}`, progresso)
        .setFooter(`Requisitado por ${message.member.displayName}`, client.user.displayAvatarURL)

    message.channel.send(embed);
    message.delete();
}