const {MessageEmbed} = require(`discord.js`);
const getID = require('../funcoes/ids.json');
const { verificaPerm } = require('../funcoes/members');
const { getMember, getRandomInt, crushBanner} = require(`../funcoes.js`);

exports.help = {
    name: "crush"
}

exports.run = async (client, message, args) => {
    message.delete();
    message.reply("Comando desabilitado temporariamente")
        .then(m => m.delete({ timeout: 1500 }))
    return;

    const flood = client.channels.cache.get(getID.sala.FLOOD),
          perm  = await verificaPerm(message.member);
    
    if(message.channel.id != flood.id && !perm){
        return message.channel.send(`Este comando não é permitido nesse canal. 
    Use o canal ${flood}, por gentileza.`)
    }
    
    if(message.member.id == "355147512216158238") { //Exclusivo da LIV
        const embed = new MessageEmbed()
        .setTitle(`SKYNDER`)
        .setDescription(`Calcule a chance de um *match* com seu *crush*.`)
        .setColor(`RANDOM`)
        .setThumbnail("https://media.giphy.com/media/xThtaxm8RQ5koMKKxW/giphy.gif")
        .setTimestamp()
        .addField(`${message.member.displayName} 💞 ${"Harry"}`,  "❤️".repeat(10))
        .setFooter(`Requisitado por ${message.member.displayName}`, client.user.displayAvatarURL)

        return message.channel.send(embed);
    }
    
    var indice    = getRandomInt(0, 10),
        progresso = "❤️".repeat(indice) + "💔".repeat(10 - indice),
        img       = "";
    let alvo      = getMember(message, args[0]),
        autor     = message.author;

    if(!alvo || message.author.id === alvo.id) {
        alvo = message.guild.members.cache
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
        img = "https://media.giphy.com/media/xThtaxm8RQ5koMKKxW/giphy.gif";
        await crushBanner(autor.displayAvatarURL, alvo.user.displayAvatarURL, true);
    } else {
        img = "https://media.giphy.com/media/3oriNM8HF8oijarwre/200w_d.gif";
        await crushBanner(autor.displayAvatarURL, alvo.user.displayAvatarURL, false);
    }

    const embed = new MessageEmbed()
        .setTitle(`SKYNDER`)
        .setDescription(`Calcule a chance de um *match* com seu *crush*.`)
        .setColor(`RANDOM`)
        .setThumbnail(img)
        .setTimestamp()
        .addField(`**${message.member.displayName} 💞 ${alvo.user.username}**`, progresso)
        .attachFile(`./images/match.png`)
        .setFooter(`Requisitado por ${message.member.displayName}`, client.user.displayAvatarURL)

    message.channel.send(embed);
    message.delete();
}
