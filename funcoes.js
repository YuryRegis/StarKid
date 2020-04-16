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


    rmvAddLog: function(data, addBool) {
        let acao = "";
        addBool ? acao = "entrou" : acao = "saiu";

        const nome = data.d.user.username,
              id   = data.d.user.id;
        let   log  = `\`\`\`Nome:  ${nome}\nID:    ${id}\`\`\``,
              msg  = `Um membro **${acao}** do servidor:\n` + log;

        return msg;
    },


    prsUPD: async function(data, client){
        let regex   = /b[a-u,0-9][c,s][a-u,0-9]t[a-u,0-9]|b[a-u,0-9]ss[a-z,0-9]t[a-u,0-9]|p[a,à,á,0-9][u,ù,ú,l,0-9]|[c,k][u,ú,ù]|[c,k][u,ú,ù][z,s][a-u,ã,0-9]|x[a-u,ò,ó,0-9]x[a-u,ò,ó,0-9]t[a-u,ã,0-9]|m[a,à,á]m[a,à,á]|p[a-u,ê,é,è,0-9]n[a-u,ì,í,0-9]s[a-u,0-9]|p[a-u,0-9][n,m][a-u,0-9]t[a-u,ã,0-9]|[c,k]y[a-u,ù,ú,0-9]|x[a-u,0-9]p[a-u,à,á,ã,0-9]|ch[a-u,0-9]p[a-u,á,à,ã,0-9]|p[a-u,0-9][a-u,0-9]t[a-u,0-9]|ch[a-u,ó,ò,0-9]ch[a-u,ó,ò,0-9]t[a-u,ã,0-9]|ch[o,ó,ò,0-9]t[a-u,ã,0-9]|[0-9]cm|x[a-u,ó,ò,0-9]t[a-u,ã,0-9]|r[a-u,ô,0-9]l[a,0-9]|p[a-u,í,ì,0-9][c,k][a-u,ã,0-9]|π[c,k]|π[c,k][a-u,ã,0-9]|[c,k][a-u,ó,ò,ô,0-9]m[a-u,0-9]d[a-u,ô,0-9]|m[a-u,ã,0-9][a-u,0-9]|p[a-u,à,á,0-9][a-u,ì,í,0-9]|t[a-u,ê,0-9]t[a,0-9]|g[a-u,ô,0-9]z[a-u,à,á,0-9]|l[a-u,â,ã,à,á,0-9]mb[a-u,0-9]|b[a-u,ò,ó,ô,0-9][q,k,c][a-u,è,é,0-9][t,c]|r[a,à,á,0-9]b[a-u,ã,0-9]|s[a-u,0-9]p[a-u,è,é,ê,0-9][c,k][a,à,á,0-9]|l[e,ê,è,é,0-9][i,ì,í,0-9]t[a-u,ã,0-9]|[a-u,0-9]ng[a-u,ò,ó,0-9]l[a-u,0-9]|[a-z,0-9]str[a-u,0-9]p[a-u,0-9]d[a-u,0-9]|[a-z,0-9]st[a-u,0-9]p[a-u,0-9]d[a-u,0-9]|b[a-u,0-9]n[a-u,0-9]d[a-u,ã,0-9]|f[a-u,ò,ó,0-9]d[a-u,ã,0-9]|bct[a-u,ã,0-9]|bct|v[a,à,á,0-9][g,j][a-u,0-9][a-z][a,à,á,0-9]|p[i,ì,í,0-9]r[o,ó,ò,ô,0-9][c,k][a-u,ã,0-9]|p[o,ô,õ,0-9]rr[a-u,ã,0-9]|p[o,ô,õ,0-9][r,h][a-u,ã,0-9]|[a-u,0-9]sp[o,ô,õ,0-9][r,h][a-u,ã,0-9]|[a-u,0-9]sp[o,ô,õ,0-9]rr[a-u,ã,0-9]/

        if(data.d.game !== null) {            
            let state = data.d.game.state;
            if (state === undefined) return null;
            if(regex.test(state.toLowerCase())) {
                let alvoID   = data.d.user.id,
                    alvo     = await client.users.get(data.d.user.id),
                    msg      = `<@&607754714100269056> <@&697930725529485362> encontrei uma ** *RichPresence* **suspeita, poderiam verificar?\n`,
                    terminal = msg + `\`\`\`Membro:   ${alvo.tag}\nNome:     ${alvo.username}\nID:       ${alvoID}\nPresence: ${state}\`\`\``;
                
                return terminal;
            }
        }
        return null;
    }, 


    mbrUPD: function(data){
        let regex   = /b[a-u,0-9][c,s][a-u,0-9]t[a-u,0-9]|b[a-u,0-9]ss[a-z,0-9]t[a-u,0-9]|p[a,à,á,0-9][u,ù,ú,l,0-9]|[c,k][u,ú,ù]|[c,k][u,ú,ù][z,s][a-u,ã,0-9]|x[a-u,ò,ó,0-9]x[a-u,ò,ó,0-9]t[a-u,ã,0-9]|m[a,à,á]m[a,à,á]|p[a-u,ê,é,è,0-9]n[a-u,ì,í,0-9]s[a-u,0-9]|p[a-u,0-9][n,m][a-u,0-9]t[a-u,ã,0-9]|[c,k]y[a-u,ù,ú,0-9]|x[a-u,0-9]p[a-u,à,á,ã,0-9]|ch[a-u,0-9]p[a-u,á,à,ã,0-9]|p[a-u,0-9][a-u,0-9]t[a-u,0-9]|ch[a-u,ó,ò,0-9]ch[a-u,ó,ò,0-9]t[a-u,ã,0-9]|ch[o,ó,ò,0-9]t[a-u,ã,0-9]|[0-9]cm|x[a-u,ó,ò,0-9]t[a-u,ã,0-9]|r[a-u,ô,0-9]l[a,0-9]|p[a-u,í,ì,0-9][c,k][a-u,ã,0-9]|π[c,k]|π[c,k][a-u,ã,0-9]|[c,k][a-u,ó,ò,ô,0-9]m[a-u,0-9]d[a-u,ô,0-9]|m[a-u,ã,0-9][a-u,0-9]|p[a-u,à,á,0-9][a-u,ì,í,0-9]|t[a-u,ê,0-9]t[a,0-9]|g[a-u,ô,0-9]z[a-u,à,á,0-9]|l[a-u,â,ã,à,á,0-9]mb[a-u,0-9]|b[a-u,ò,ó,ô,0-9][q,k,c][a-u,è,é,0-9][t,c]|r[a,à,á,0-9]b[a-u,ã,0-9]|s[a-u,0-9]p[a-u,è,é,ê,0-9][c,k][a,à,á,0-9]|l[e,ê,è,é,0-9][i,ì,í,0-9]t[a-u,ã,0-9]|[a-u,0-9]ng[a-u,ò,ó,0-9]l[a-u,0-9]|[a-z,0-9]str[a-u,0-9]p[a-u,0-9]d[a-u,0-9]|[a-z,0-9]st[a-u,0-9]p[a-u,0-9]d[a-u,0-9]|b[a-u,0-9]n[a-u,0-9]d[a-u,ã,0-9]|f[a-u,ò,ó,0-9]d[a-u,ã,0-9]|bct[a-u,ã,0-9]|bct|v[a,à,á,0-9][g,j][a-u,0-9][a-z][a,à,á,0-9]|p[i,ì,í,0-9]r[o,ó,ò,ô,0-9][c,k][a-u,ã,0-9]|p[o,ô,õ,0-9]rr[a-u,ã,0-9]|p[o,ô,õ,0-9][r,h][a-u,ã,0-9]|[a-u,0-9]sp[o,ô,õ,0-9][r,h][a-u,ã,0-9]|[a-u,0-9]sp[o,ô,õ,0-9]rr[a-u,ã,0-9]/

        let nome = data.d.user.username,
            id   = data.d.user.id,
            nick = data.d.nick,
            msg  = `<@&607754714100269056> <@&697930725529485362> encontrei um **nome** ou** *nick* **suspeito, poderiam verificar?\n`;
        
        if( regex.test(nome.toLowerCase()) ) {
            let terminal = msg + `\`\`\`Membro:    ${nome}\nID:        ${id}\nVerificar: ${nick}\`\`\``;
            return terminal;
        }
        if( nick !== null ) {
            if( regex.test(nick.toLowerCase()) ){
                let terminal = msg + `\`\`\`Membro:    ${nome}\nID:        ${id}\nVerificar: ${nick}\`\`\``;
                return terminal;
            }
        }
        return null;
    },


    formatDate: function(date) {
        return new Intl.DateTimeFormat('pt-BR').format(date)
    },


    setRole: async function(client, data, servidorID) {
        let servidor = await client.guilds.get(servidorID);
        let membro   = await servidor.members.get(data.d.user_id);

        let android = await servidor.roles.get('627270660271374387'),
            apple   = await servidor.roles.get('627275771710406673'),
            beta    = await servidor.roles.get('627273901197492244'),
            skyG    = await servidor.roles.get('653331984420175903')

    if(data.t === "MESSAGE_REACTION_ADD"){
        if(data.d.emoji.id === "698184753848778883"){
            if(membro.roles.has(android)) return
            membro.addRole(android)
        } 
        else if(data.d.emoji.id === "698184635724857445"){
            if(membro.roles.has(apple)) return
            membro.addRole(apple)
        }
        else if(data.d.emoji.name === "🛠️"){
            if(membro.roles.has(beta)) return
            membro.addRole(beta)
        }
        else if(data.d.emoji.name === "🌐"){
            if(membro.roles.has(skyG)) return
            membro.addRole(skyG)
        }
    }

    if(data.t === "MESSAGE_REACTION_REMOVE"){
        if(data.d.emoji.id === "698184753848778883"){
            if(membro.roles.has(android)) return
            membro.removeRole(android)
        } 
        else if(data.d.emoji.id === "698184635724857445"){
            if(membro.roles.has(apple)) return
            membro.removeRole(apple)
        }
        else if(data.d.emoji.name === "🛠️"){
            if(membro.roles.has(beta)) return
            membro.removeRole(beta)
        } 
        else if(data.d.emoji.name === "🌐"){
            if(membro.roles.has(skyG)) return
            membro.removeRole(skyG)
        }
    }
        return
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
    },


    mostrarMesa: function(jAnterior, jAtual, jSeguinte, embed, carta) {
        var cor = carta.cor;
        var cartasAtual = jAtual.mao
        var cartaAnterior = jAnterior.mao
        var cartaSeguinte = jSeguinte.mao
        cartasAtual = cartasAtual.length
        cartasSeguinte = cartaSeguinte.length
        cartasAnterior = cartaAnterior.length
        if(carta.cor==="AZUL") {cor="#13BAF2"}
        if(carta.cor==="VERDE") {cor="#1AF213"}
        if(carta.cor==="AMARELO") {cor="#FAFB2C"}
        if(carta.cor==="VERMELHO") {cor="#CF3F47"}
        embed.setTitle(`Carta da Mesa`)
            .setColor(cor)
            .setImage(carta.imagem)
            .setDescription(`**${carta.titulo}**`)
            .setThumbnail(`https://i.ibb.co/5KrcKFr/uno.png`)
            .addField(`Jogador ATUAL:`, `${jAtual.nome} - ${cartasAtual} carta(s)`, false)
            .addField(`Jogador anterior:`, `${jAnterior.nome} - ${cartasAnterior} carta(s)`, true)
            .addField(`Jogador seguinte:`, `${jSeguinte.nome} - ${cartasSeguinte} carta(s)`, true)
            .setFooter(`ThatSkyGameBrasil - UNO !!!`, `https://www.psxbrasil.com.br/trophyguide/uno/logo.png`);
        return embed;
    },


    comprarCarta: function(quantidade, baralho, jogador) {
        for(q=0; q<quantidade; q++) {
            var indice = Math.floor(Math.random() * (baralho.length));
            var carta = baralho[indice];
            jogador.mao.unshift(carta);
            baralho.splice(indice,1);
        }
        return baralho, jogador;
    },


    mostrarMao: function(jogador) {
        var msg = "";
        var quantidade = jogador.mao.length;
        if(quantidade===0){
            return "`SEM CARTAS`";
        }
        for (q=0; q<quantidade; q++)  {
            msg += ` \`${String(jogador.mao[q].titulo)}\` - `;
        }
        return msg;
    },


    pularJogador: function(jogadores) {
        jogadores.push(jogadores[0]);
        jogadores.splice(0,1);
        
        return jogadores;
    },


    espiarMao: function(jogador, carta) {
        var cartas = jogador.mao;
        var encontrou = false;
        for(i=0; i<cartas.length; i++) {
            if(cartas[i].id === carta.id) {
                encontrou = true;
            }
        } return encontrou;
    },


    encerrarPartida: function(client, vencedor, embed) {
        const usuario = client.users.get(vencedor.id);
        var txt = `**${vencedor.nome}** descartou sua última carta e ergueu o troféu !!!\n`;
        embed.setTimestamp()
            .setColor('#FAFB2C')
            .setDescription(txt)
            .setTitle("🏆  VENCEDOR")
            .setThumbnail(usuario.avatarURL)
            .setImage("https://i.ibb.co/MMfb23m/trofeu.png")
            .setFooter(`ThatSkyGameBrasil - UNO!!!`, `https://www.psxbrasil.com.br/trophyguide/uno/logo.png`);
        
        return embed;
    },


    somaPontos: function(jogadores) {
        let tamJogadores = jogadores.length;

        if(tamJogadores===0) {
            return console.log("somaPontos: Nenhum jogador na lista.")
        }
        let pontos = [];
        let pontuacao = 0;

        jogadores.forEach(jogador => {
            let ponto = 0;
            let mao = jogador.mao;
            mao.forEach(carta => {
                const intID = parseInt(carta.id);
                if(intID<10) {
                    ponto += intID;
                }
                if(intID > 9 && intID <13){
                    ponto += 20;
                } 
                if(intID>=13) {
                    ponto += 50;
                }
            })
            pontos.push(ponto);
        });
        pontos.forEach(p => { pontuacao += p });
        pontuacao = Math.round(pontuacao / tamJogadores);
        console.log("somaPontos: pontuação -> ", pontuacao);
        return  pontuacao;
    }   
    
};