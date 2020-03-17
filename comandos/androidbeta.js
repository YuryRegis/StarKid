const {RichEmbed} = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new RichEmbed();
    embed.setColor("GREEN");
    embed.setThumbnail("https://i.ibb.co/K5YGrcK/A80-AB724-7-CA1-456-B-8345-702-F6-C3-EF9-FB.png");
    embed.setTitle("**INSTRUÇÕES PARA ACESSO BETA ANDROID**");
    embed.setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    embed.setDescription("\n1️⃣  Use este link direto para acesso Beta:\n" +
    "    [Convite Beta Android](https://play.google.com/apps/testing/com.tgc.sky.android.test.gold)\n\n" +
    "2️⃣  Siga as instruções para Download contidas no Link ou, se prefir, no o vídeo a seguir:\n\n" +
    "    [YouTube: Instalando Beta Android](https://www.youtube.com/watch?v=VtuHYOcQzqU&t=5s)\n\n" +
    "❕   Existe um limite de convites para o Beta, se for este o caso, aguarde uma nova onda de convites.\n\n" +
    "Fique de olho no canal #notícias_e_avisos, sempre avisamos quando a TGC libera novos convites.\n\n" +
    "⚙  Se deseja ser Beta test de Sky nas futuras plataformas (console, PC, MacOS e AppleTv), registre seu e-mail aqui:" +
    "    https://thatgamecompany.com/#newsletter");
    embed.setTimestamp();

    const m = await message.channel.send(embed);
    message.delete(); 
    return m
}

exports.help = {
    name: "androidbeta"
}