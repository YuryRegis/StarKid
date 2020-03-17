const {RichEmbed} = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new RichEmbed();
    embed.setColor("WHITE");
    embed.setThumbnail("https://i.ibb.co/vzgQL2x/6-E03519-F-A591-4-AEC-96-A3-44-ECB07699-ED.png");
    embed.setTitle("**INSTRUÇÕES PARA ACESSO BETA iOS**");
    embed.setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    embed.setTimestamp();
    embed.setDescription("\n1️⃣  Faça download e instalação do app TestFlight:\n" +
    "    [TestFlight Download](https://apps.apple.com/us/app/testflight/id899247664)\n\n" +
    "2️⃣  Após instalado, use este convite para acesso beta de Sky:\n" +
    "    [Convite Beta iOS](https://testflight.apple.com/join/S41tc3c0?fbclid=IwAR1oJs2vMsxFTO4nececyBItvPNTMv-UhMRJgKctlc6-R-yM97M6GXAY6j0)\n\n" +
    "3️⃣  Abra o app TestFlight e instale Sky Beta. Pronto!\n\n" + 
    "❕  Existe um limite de convites para o Beta iOS, se for este o caso, aguarde uma nova onda de convites.\n\n" +
    "Fique de olho no canal #notícias_e_avisos, sempre avisamos quando a TGC libera novos convites.\n\n" + 
    "⚙  Se deseja ser Beta test de Sky nas futuras plataformas (console, PC, MacOS e AppleTv), registre seu e-mail aqui:" +
    "    https://thatgamecompany.com/#newsletter");
    
    const m = await message.channel.send(embed);
    message.delete()
    return m
}

exports.help = {
    name: "iosbeta"
}