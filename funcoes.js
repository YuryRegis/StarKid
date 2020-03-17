module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptMessage: async function (message, author, time, validReactions) {
        // Tempo em segundos
        time *= 1000;

        // Reage com cada emoji enviado como parametro
        for (const reaction of validReactions) await message.react(reaction);

        // Permite reações apenas do autor da mensagem, 
        // Filtra apenas emojis enviados pelo parametro.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // Aguarda reação do usuário
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },

    getJoinRank: function(ID, guild) { // ID do usuario e guild (servidor)
        if (!guild.member(ID)) return; // Retorna "Undefined" se o ID for inválido
    
        let arr = guild.members.array(); // Cria um array de todos os membros
        arr.sort((a, b) => a.joinedAt - b.joinedAt); // Organizando por data de entrada
    
        for (let i = 0; i < arr.length; i++) { 
          if (arr[i].id == ID) return i + 1; // Retorna posição do membro no servidor
        }
    },
    
    getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    getEmbed: function(anterior, atual, seguinte, embed, carta){
        embed.setTitle(carta.titulo)
            .setThumbnail(carta.imagem) //thumbnail da carta
            .setDescription(carta.info)
            .addField(`**Jogador ATUAL:**`, atual)
            .addField(`Jogador anterior:`, anterior)
            .addField(`Jogador seguinte:`, seguinte)
            .setFooter(`ThatSkyGameBrasil - CIRCULO DE FOGO 🔥 +18`);
        return embed
    }

};