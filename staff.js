const {RichEmbed} = require("discord.js");

exports.run = async (client, message, args) => {
    let member = args[0].toLowerCase()

    console.log(member)

    if (member == "harry" || member == "liv" || member == "jc" || member == "john") {
        const embed = new RichEmbed();

        const harry = "Ola, eu sou o Harry! Sou responsável por criar este" +
        " servidor no Discord bem como o canal do YouTube ThatSkyGameBrasil e " +
        "o blog, de mesmo nome. A princípio, meu objetivo era reunir toda a " + 
        "informação que eu consegui coletar durante minha experiência, como " +
        "jogador Beta, em um único lugar para auxiliar jogadores falantes de" +
        " português no universo de Sky. " + `"*Te vejo em Sky!*"`

        const ana = "Girl gamer de jogos para celular.\n" +
        "Não aceito muito bem morrer nos jogos e é o que mais acontece.\n"

        const jotaC = "Globetrotter looking 4 something new to drop it to you!\n" +
        " #apple ’s designer and developer, casado, advogado, designer e instagramer!\n"+
        "Just be #fashion"

        const john = "Olá jovem Padawan!!" + 
        "\nSou o John :man_mage_tone3:" +
        "\nTenho 18 anos, sou do Japão :flag_jp:" + 
        "\nAmo café ☕️ livros :books: e natureza :camping:\n\n" +            
        '“*Lar é onde você se sente em casa e é bem tratado.*“'

        const frau = "Heyy! Sou a Ste, mais conhecida como Frau."+
        "\nEstudante, amante de jogos e cultura geek. Adoro fazer amizades"+
        " novas no Sky! Que tal fazer uma festa da mesa na campina huh?" + 
        `\n\n“*Vou indo e quando eu voltar, estarei de volta” - Gandalf*"`

        const miles = "Inhai, eu sou a Miles :sparkles:" +
        "\nEstudante, 21 anos, fã de Coldplay, louca por Star Wars" + 
        " e atualmente viciada em Sky." +
        `\n\n“*Vamos assar Crabs!*"`

        if (member == "harry") {
            embed.setTitle("**STAFF: HARRY**")
            embed.setDescription(harry)
            embed.setThumbnail("https://i.imgur.com/cZGvfw5.png")
        } else if (member == "liv") {
            embed.setTitle("**STAFF: LIV TAGLIANI**");
            embed.setDescription(ana)
            embed.setThumbnail("https://i.imgur.com/FHYB9jm.png")
        } else if (member == "jc") {
            embed.setTitle("**STAFF: JC**");
            embed.setDescription(jotaC)
            embed.setThumbnail("https://i.imgur.com/LtV2fUK.png")
        } else if (member == "john") {
            embed.setTitle("**STAFF: JOHN KANETA**");
            embed.setDescription(john)
            embed.setThumbnail("https://i.imgur.com/s7OUfac.png")
        }
        else if (member == "frau") {
            embed.setTitle("**STAFF: FRAU STE**");
            embed.setDescription(frau)
            embed.setThumbnail("https://i.imgur.com/BemjUSd.png")
        } 
        else if (member == "miles") {
            embed.setTitle("**STAFF: MILES**");
            embed.setDescription(miles)
            embed.setThumbnail("https://i.imgur.com/xjKtORU.png")
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