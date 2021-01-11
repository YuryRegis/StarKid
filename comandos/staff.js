const {MessageEmbed} = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete();
    message.reply("Comando desabilitado temporariamente")
        .then(m => m.delete({ timeout: 1500 }))
    return;
    let member = args[0].toLowerCase()

    console.log(member)

    let regex = /harry|liv|jc|miles/

    if (regex.test(member)) {
        const embed = new RichEmbed();

        const harry = "Ola, eu sou o Harry! Sou responsável por criar este" +
        " servidor no Discord bem como o canal do YouTube ThatSkyGameBrasil e " +
        "o blog, de mesmo nome. A princípio, meu objetivo era reunir toda a " + 
        "informação que eu consegui coletar durante minha experiência, como " +
        "jogador Beta, em um único lugar para auxiliar jogadores falantes de" +
        " português no universo de Sky. " + `\n\n"*Te vejo em Sky!* :abraco:"`

        const ana = "A sherlock neurótica\n\n" +
        "Girl YouTuber, a brava, a manda-chuva, a rainha da cocada preta," +
        " a portadora das facas e campeã olímpica de arremesso de pessoas"+ 
        " pela janela. Iniciou com a ideia do canal no Discord para reunir " +
        "vítimas, quero dizer, jogadores.\nTem Coca-Cola :cup_with_straw: " +
        "nas veias e :pizza: no coração. Colecionadora de corações, Evil Queen. A Sherlock Holmes psicopata." +
        "\n\n:balloon::clown: “*Vem brincar comigo*”"

        const jotaC = "Jc, o cara gente boa!\n\nNão é gamer, mas entende de" +
        " programação! Jamais afronte ele, fica a dica!\nApresentador do programa:" +
        " na cama com JC, normalmente ao ar nas noites de quinta e entrevistador dos" +
        " novos usuários do discord.\nAma design, leis, alta tecnologia, desenvolvimento" +
        " de softwares e cidadão do mundo. \n\n*Globetrotter looking 4 something new" +
        " to drop it to you! casado e ~~safado~~.* ’*designer and developer (desenvolvedor" +
        " e projetista da empresa Apple).*"

        const miles = "Inhai, eu sou a Miles :sparkles:" +
        "\n\nEstudante, 21 anos, fã de Coldplay, louca por Star Wars" + 
        " e atualmente viciada em Sky." +
        `\n\n“*Vamos assar Crabs!*"`

        if (member == "harry") {
            embed.setTitle("**STAFF: HARRY**")
            embed.setDescription(harry)
            embed.setThumbnail("https://i.imgur.com/cZGvfw5.png")
        } else if (member == "liv") {
            embed.setTitle("**STAFF: LIV TAGLIANI**");
            embed.setDescription(ana)
            embed.setThumbnail("https://i.ibb.co/smCTDFc/LiviAna.png")
        } else if (member == "jc") {
            embed.setTitle("**STAFF: JC**");
            embed.setDescription(jotaC)
            embed.setThumbnail("https://cdn.discordapp.com/attachments/612399243520639016/708204055029088256/image0.jpg")
        // } else if (member == "john") {
        //     embed.setTitle("**STAFF: JOHN KANETA**");
        //     embed.setDescription(john)
        //     embed.setThumbnail("https://i.ibb.co/c2BrMPK/john2.png")
        // }
        // else if (member == "frau") {
        //     embed.setTitle("**STAFF: FRAU STE**");
        //     embed.setDescription(frau)
        //     embed.setThumbnail("https://i.ibb.co/HpjBRqf/Ste2.png")
        } 
        else if (member == "miles") {
            embed.setTitle("**STAFF: MILES**");
            embed.setDescription(miles)
            embed.setThumbnail("https://i.ibb.co/m0nDsyq/image2.png")
        }
       
        embed.setTimestamp();
        embed.setColor("RANDOM")
        embed.setFooter(message.guild.me.displayName, client.user.displayAvatarURL);

        await message.channel.send(embed).catch(err => console.log(err))
        message.delete()
        return 

    } else {
        return
    }
}//exports.run


exports.help = {
    name: "staff"
}