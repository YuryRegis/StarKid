const { RichEmbed } = require("discord.js");


module.help = {
    name: "faq"
}

module.exports = {

    trocas: async function(client, message) { 

        const pensar    = await client.emojis.get("698300067899113494"),
              soquinho  = await client.emojis.get("698301252127162439"),    
              cafune    = await client.emojis.get("698300785208852490"),
              pedinte   = await client.emojis.get("698301297836687362"),
              observar  = await client.emojis.get("698300653407174736"),
              trocaChnl = await message.guild.channels.get("644687909248565278"); 

        let embed = new RichEmbed()
            .setTimestamp()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`**TROCAS, DOAÇÕES E PEDINTES** ${pensar}`)
            .addBlankField()
            .addField(`${soquinho} **TROCAS**`,
                `Nosso canal de trocas ${trocaChnl} é o local destinado para caso você esteja procurando alguém para trocar corações, porém, caso não tenha velas suficientes para fazer a sua parte da troca, então este lugar não é para você. 
                Neste canal, é **proibido** mencionar tags e cargos. Pense neste canal como um "*classificados*" onde você divulga que está disponível para troca e, caso alguém veja seu anúncio, ela ira entrar em contato com você para que possam se adicionar no jogo e realizar  a troca.`,
                false)
            .addBlankField()
            .addField(`${cafune} **DOAÇÕES**`,
                `Para fazer doações, é preciso que, a pessoa para quem você quer doar, esteja adicionada como amigo em sua constelação. Deixe claro para ela que é uma doação, envie uma mensagem (ou cartão com uma dedicatóra pra ela). Assim ela não se sentirá tão constrangida ou na obrigação em retrinuir.`,
                false)
            .addBlankField()
            .addField(`${pedinte} **PEDINTES**`,
                `É expressamente **proibido** pedir corações, passes, *giftcards* ou qualquer coisa desta natureza dentro do nosso servidor e, até mesmo, por mensagem direta a algum membro. Ao entrar no servidor você concordou com nossos termos e estará sujeito à **banimento** (imagem em anexo). Caso algum membro te deixe constrangido com alguma coisa, procure a @Staff imediatamente e reporte o acontecimento.`,
                false)
            .addBlankField()
            .addField(`${observar} **OBSERVAÇÃO**`,
                `Se você, em alguma negociação, não tiver velas e a administração do servidor receber reclamações, ficará restrito a usar o canal ${trocaChnl} até que cumpra com sua última negociação pendente (tire print, para se resguardar).  Em caso de reincidência você ficará silenciado no nosso servidor, não podendo interagir em nenhum canal, até que cumpra com sua última negociação pendente (tire print, para se resguardar). No caso de 2ª reincidência, você estará "convidado" a se retirar do nosso servidor.`, 
                false)
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL)
            .setImage("https://cdn.discordapp.com/attachments/603724150275702835/699639233270382692/Regrapedinte.png");
            
        return embed;
    },


    amigos: async function(client, message) {
        
        const hi5 = await client.emojis.get("698300999462420480");

        let embed = new RichEmbed()
            .setTimestamp()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`**ADICIONANDO AMIGOS** ${hi5}`)
            .setDescription("Aqui você encontra um mini-tutorial de como adiocionar novos amigos, porém, você também pode consultar o nosso tutorial mais detalhado no blog [ThatSkyGameBrasil](https://thatskygamebrasil.weebly.com/tutoriais.html) ou [YouTube](https://www.youtube.com/playlist?list=PL2PBX0NE622i2YqGV5m238Uve-M2xt6Pw)")
            .addBlankField()
            .addField(`1. Abrindo menu no jogo`, 
                `Toque no canto superior direito da tela e, em seguida, no ícone de engrenagem (⚙️) que irá aparecer. No menu, clique no icone de QRCode, conforme passo 1 da figiura.`,
                false)        
            .addBlankField()
            .addField('2. Definindo nome',
                'Em Sky, você pode nomear seu amigo da maneira que desejar, seja apelido ou nome real. Uma dica legal é colocar uma bandeirinha do país a qual ela pertence, assim você não irá esquecer a nacionalidade do seu amigo.',
                false)
            .addBlankField()
            .addField('3. Gerando um link',
                'Os links gerados pelo jogo são de uso único, expirando assim que o seu amigo o usar. Não é possível add mais de 1 pessoa por link gerado. Para gerar o link, clique em **compartilhar**, conforme item 3 da figura',
                false)
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL)
            .setImage("https://cdn.discordapp.com/attachments/698929997636960337/699058288075079730/BeFunky-collage_5.jpg");
        
        return embed;
    },


    voar: function(client, message) {

        let embed = new RichEmbed()
            .setTimestamp()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`**COMO VOAR**`)
            .setDescription("Aqui você encontra um mini-tutorial de como voar, porém, você também pode consultar o nosso tutorial mais detalhado, e com imanges, no blog [ThatSkyGameBrasil](https://thatskygamebrasil.weebly.com/tutoriais.html).")
            .addBlankField()
            .addField(`**MODO DUAS MÃOS** 🖐️🖐️`, 
                `Tente imaginar uma linha imaginária no centro da tela que a divide em dois lados: direito e esquerdo. Tenha em mente que cada mão terá um papel diferente para o controle do personagem. Sua mão esquerda terá o controle do personagem enquanto sua direita terá o controle da câmera. Com a mão esquerda, use o dedão para deslizar com movimentos curtos nas direções esquerda e direita, para fazer manobras e curvas mais fechadas. Você pode fazer o mesmo de cima para baixo ou vice-versa para manobras acrobáticas.`,
                false)        
            .addBlankField()
            .addField('**MODO UMA MÃO** 🖐️',
                'você terá que alternar entre um ou dois dedos. Deslize um dedo em um dos cantos da tela para mover o seu personagem. Você poderá fazer o mesmo, utilizando dois dedos, para movimentar a câmera. Talvez o modo de uma mão possa exigir um pouco mais de treino então, não desanime!',
                false)
            .addBlankField()
            .addField('**ESTILO "HELICOPTERO"**  🚁',
                'Você terá mais controle para pousar com graça e estilo, até mesmo em locais mais difíceis, como a pontinha de um arranha-céu do castelo.',
                false)
            .addBlankField()
            .addField('**ESTILO "AVIÃO"** 🛩️',
                'você irá alcançar distâncias maiores, porém, com pouca precisão.',
                false)
            .addBlankField()
            .addField('**ALTERNANDO ESTILOS**  🚁 + 🛩️',
                'Quando você estiver próximo do chão ou em alguns lugares especiais, você irá notar um botão novo aparecer no canto inferior direito da tela, use-o para alternar o estilo de voo.\n**Dica:** Abuse de ambos estilos para impressionar seus amigos com suas habilidades e acrobacias.',
                false)
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL);
        
        return embed;
    },


    escritorio: function(client, message) {
        
        let embed = new RichEmbed()
            .setTimestamp()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`**INFORMAÇÕES SOBRE O ESCRITÓRIO**`)
            .setDescription("Aqui você encontra informações resumidas sobre o escritório, porém, você também pode consultar o nosso blog para informações mais detalhadas: [ThatSkyGameBrasil](https://thatskygamebrasil.weebly.com/tutoriais.html).")
            .addBlankField()
            .addField(`**LOCALIZAÇÃO** 🗺️`, 
                `O escritório é um *easteregg* escondido no ||1º andar do Relicário||. Para entrar lá você irá precisar de ||uma capa azul **ou** algum amigo que a tenha||. [Vídeo](https://www.youtube.com/watch?v=qLbqge8YQac)`,
                false)        
            .addBlankField()
            .addField('**CAPA AZUL**',
                'A capa azul, a principio, foi um presente dado aos jogadores que participaram do beta teste. Posteriormente, a TGC, decidiu vender este item e você pode adquiri-lo ||com um NPC presente no escritório, basta conversar com ele e abrir a loja para visualizar o item para compra. Além da capa azul, voce tambem pode comprar itens especiais como gorro de natal, capa de vampiro ou cabeça de abóbora. Atenção! Estes itens são limitados à épocas especificas como natal e *halloween*.||',
                false)
            .addBlankField()
            .addField('**SEGREDOS**',
                'Cada dia da semana o escritório guarda um segredo diferente ||desde histórias dos desenvolvedores à um gato voando em uma vassoura||. Você pode ver todos os segredos nessa [playlist SPOILERS](https://www.youtube.com/playlist?list=PL2PBX0NE622h38Byzc6XlTulh7I5HFvrj)',
                false)
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL)
            .setImage("https://i.ibb.co/M9qDTDK/escritorio-TGC.png");
        
        return embed;
    },


    temporadas: async function(client, message) {
        
        const point = await client.emojis.get("698311681121452032");

        let embed = new RichEmbed()
            .setTimestamp()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`**INFORMAÇÕES SOBRE O TEMPORADAS**`)
            .setDescription("São eventos que acontecem, **geralmente**, a cada 2 meses, com pausa aproximada de duas semanas entre elas, e com temas em torno da estação atual do ano (como verão ou inverno) e são ativos por períodos curtos, durante os quais um grupo seleto de *emotes* e cosméticos está disponível durante a temporada. Mais informações: [ThatSkyGameBrasil](https://thatskygamebrasil.weebly.com/tutoriais.html).")
            .addBlankField()
            .addField(`**TEMPORADAS** `, 
                `${point} Winter (2018 - Beta);`
                +`\n${point} Winter (2019 - pré-lançamento iOS);`
                +`\n${point} Temporada da Gratidão (Primavera 2019 - Beta + pré-lançamento iOS);`
                +`\n${point} Temporada da Gratidão (Verão 2019 - Global) [Playlist](https://is.gd/UvGJVd);`
                +`\n${point} Temporada Caçadores de luz (Setembro 2019 - Global) [Playlist](https://is.gd/vwj8g0);`
                +`\n${point} Temporada do Pertencer (Novembro 2019 - Global) [Playlist](https://is.gd/P86HS4);`
                +`\n${point} Temporada do Ritmo (Janeiro 2020 - Global) [Playlist](https://is.gd/hqDiYi);`
                +`\n${point} Temporada dos Encantos (Abril 2020 - Global) [Playlist](https://is.gd/ppz7yg)`,
                false)
            .addBlankField()        
            .addField('**DURAÇÃO DE CADA TEMPORADA**',
                'Você pode conferir o tempo que cada temporada durou, nos links de ITENS abaixo.',
                false)
            .addBlankField()
            .addField('**ITENS DE CADA TEMPORADA**',
                `Além das playlists acima você consegue consultar os itens aqui:`
                +`\n${point} [Temporada da Gratidão](https://discordapp.com/channels/603720312911167622/624350432088686593/697266173074473001);`
                +`\n${point} [Temporada Caçadores de luz](https://discordapp.com/channels/603720312911167622/624350432088686593/697266486317940776);`
                +`\n${point} [Temporada do Pertencer](https://discordapp.com/channels/603720312911167622/624350432088686593/697266796872597515);`
                +`\n${point} [Temporada do Ritmo](https://discordapp.com/channels/603720312911167622/624350432088686593/697267069246373948);`
                +`\n${point} [Temporada dos Encantos](https://discordapp.com/channels/603720312911167622/624350432088686593/701718532668260472)`,
                false)
            .addBlankField()
            .addField('**PASSE DA TEMPORADA**',
                `As recompensas dos Espíritos sazonais são divididas em dois níveis: gratuito e *Passe da aventura*. Se o jogador comprou o *Passe da aventura*, ele terá acesso para comprar todas as recompensas, usando velas sazonais. Existem pacotes de *Passe da aventura* que permite você presentear amigos com o passe, além de velas extras e cordão exclusivo da temporada.\n\nVALE A PENA COMPRAR?\n\nAlguns itens são exclusivos para quem tem o passe, então só cabe a você mesmo julgar se vale ou não a pena.`,
                false)
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL)
        
        return embed;
    },


    velas: async function(client, message) {
        
        const vela = await client.emojis.get("698301566091788289");

        let embed = new RichEmbed()
            .setTimestamp()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`**INFORMAÇÕES SOBRE CORAÇÕES E VELAS** ${vela}`)
            .setDescription("Velas são o cerne dos colecionáveis. São a base para você adquirir corações que, por sua vez, são necessários para adquirir itens colecionáveis como capas, acessórios, novo visual no cabelo e roupas além de instrumentos musicais. Mais detalhes no nosso blog: [ThatSkyGameBrasil](https://thatskygamebrasil.weebly.com/colecionaveis.html).")
            .addBlankField()
            .addField(`**COMO OBTER? COMO FARMAR CERA?**`, 
                `Você irá obter novas velas a medida que se coleta *ceras*, ao acender novas velas ou queimar criaturas da escuridão, como as plantas negras. Chamamos de *cera* aqueles pontinhos vermelhos que são coletados durante este processo.`,
                false)        
            .addBlankField()
            .addField('**VELAS STORM (EDEN)** 🌩️',
                'Sempre que você completar sua jornada, no Eden, antigo Storm, você irá receber **cera storm** dependendo do seu desempenho lá. Estas **velas storm** são importantes para desbloquear alguns níveis especiais de *upgrade* dos espíritos que você encontrou ajudou durante sua jornada em Sky. Agora você também pode usar velas storm para desbloquear niveis de amizade.',
                false)
            .addBlankField()
            .addField('**VELAS SAZONAIS (TEMPORADA)** 🕯️',
                'Em cada temporada você verá velas especiais para serem coletadas além das tradicionais que você já vem coletando até o momento. Elas serão usadas para desbloquear emotes e itens exclusivos de cada temporada. No final de cada temporada, as velas sazonais são convertidas em velas comuns.',
                false)
            .addBlankField()
            .addField('**CORAÇÕES** ❤️',
                `Para adquirir itens você terá que evoluir os espíritos que você encontrou através de velas ou corações. Cada item irá exigir uma quantidade diferente de velas ou corações ou até mesmo não custar nada, desde que evolua o espírito. Pode-se adquirir corações evoluindo espiritos (limitados a 1 por espirito) ou recbendo por doações de seus amigos.`,
                false)
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL);
        
        return embed;
    },


    estrelas: async function(client, message) {
        
        const estrela = await client.emojis.get("698311681121452032");

        let embed = new RichEmbed()
            .setTimestamp()
            .setColor("LUMINOUS_VIVID_PINK")
            .setTitle(`**PODER DE VOO E ESTRELAS** ${estrela}`)
            .setDescription("Este é apenas um resumo. Para mais detalhes, confira nosso blog: [ThatSkyGameBrasil](https://thatskygamebrasil.weebly.com/estrelas.html).")
            .addBlankField()
            .addField(`**AQUILO É UMA CRIANÇA OU ESTRELA?**`, 
                `Por que estrela? Bem, até a versão beta 0.4.8 não eram crianças, mas sim, estrelas (tinham exatamente este simbolo 👉 ${estrela}). Por alguma razão a TGC resolveu que seria melhor mudar para crianças e nomeando-as de "**Luzes Aladas**" O @StarKid é uma homenagem à comunidade beta que, ainda hoje, utilizam o saudoso termo "starkid".`,
                false)
            .addBlankField()        
            .addField('**COMO OBTER?**',
                'Estrelas estão espalhadas em todos os sete reinos (mundos) de **Sky: Filhos da luz**.',
                false)
            .addBlankField()
            .addField('**PODER DE VOO - ENERGIA - CONTADOR DE ESTRELAS**',
                'Note que existe uma barra medidora de energia, em forma de leque, bem no menu superior do jogo. Você poderá aumentar seu limite máximo (level) ao acumular estrelas, então, quanto mais estrelas tiver melhor será sua performance no jogo. Você pode recarregar sua *energia* se aproximando de seus amigos, nuvens, criaturas de luz ou coletando *ceras*.',
                false)
            .addBlankField()
            .addField('**LOCALIZAÇÃO**',
                `SPOILER! Links com a localização das estrelas:`        
                +`\n${estrela} [Ilha do Alvorecer](https://is.gd/Y2EOfz);` 
                +`\n${estrela} [Campina da Aurora](https://is.gd/yZvckW);` 
                +`\n${estrela} [Floresta Oculta](https://is.gd/1fvpy4);`   
                +`\n${estrela} [Vale do Triunfo](https://is.gd/Sr7rJ0);`   
                +`\n${estrela} [Sertão Dourado](https://is.gd/iLaiiv);`    
                +`\n${estrela} [Relicário do Conhecimento](https://is.gd/EXdnkV);`
                +`\n${estrela} [Olho do Éden](https://is.gd/lJvlXp);`,
                false)
            .setThumbnail("https://i.ibb.co/NK93PhJ/estrelas.png")
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL);
        
        return embed;
    }
    

}
