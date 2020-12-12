const { MessageEmbed } = require("discord.js");


module.exports = {
    
    embedSimples: function (cor, titulo, thumb, descricao, imagem) {
        let embed = new MessageEmbed();

        embed.setColor(cor)
            .setTitle(titulo)
            .setThumbnail(thumb)
            .setDescription(descricao)
            .setImage(imagem);
        
        return embed;
    }
}