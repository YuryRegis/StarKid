const jimp                  = require("jimp"),
{ MessageEmbed }            = require("discord.js"),
{ getRandomInt }            = require('../../../funcoes'),
{ dbDeleteVIP, dbListVIPs } = require('../../../Routes/rotasVIP');


module.exports = {

    ticket: async function(cupom, args) {

        let fundo    = await jimp.read(`./images/tiket.png`),
            carimboT = await jimp.loadFont(`./images/projetoPSD/Carimbo.fnt`),
            carimboN = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

        
        fundo.print(carimboT, 25, 40, args);
        fundo.print(carimboN, 60, 79, cupom);
        fundo.write(`./comandos/assets/loto/ticket.png`);
        
        return;
    },


    geraCupom: function() {
        const cartela = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                         '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                         '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                         '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
                         '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
                         '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',]
        let cupom = '';
        
        for(i=0; i<6; i++) {
            let indice = getRandomInt(0,59),
                digito = cartela[indice][1];
            
            cupom += digito;
        }
        return cupom;
    },


    messageEmbed: async function(cupom, args, corpo) {
        let embed = new MessageEmbed(),
            logo  = "https://s3.amazonaws.com/assets.apoia.se/campaigns/5db49c70e2d7737c4cd4e520%7C5db49c99193385a323d53d4c/user-campaign-about-photo%7CDisocodLogo-20200502_23062002.png";
        
        embed
            .setTimestamp()
            .setColor('#F0FF01')
            .setTitle(`**SORTEIO ${args}**`.toUpperCase())
            .setThumbnail(logo)
            .setDescription(`Apuração do concurso ${corpo.concurso} da Caixa Econômica Federal.\nEm breve iremos anunciar o membro contemplado.`)
            .addField("CONCURSO", corpo.concurso, true)
            .addField("DATA", corpo.dataStr, true)
            .addField("RESULTADO", corpo.resultadoOrdenado.split('-').join(" "), true)
            .addField("CUPOM GERADO", cupom, true)
            .attachFiles(['./comandos/assets/loto/ticket.png'])
            .setImage("attachment://ticket.png")
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky`, logo);
        return embed;
    },

    vencedor: async function(apoiador, args) {
        let embed = new MessageEmbed(),
            logo  = "https://s3.amazonaws.com/assets.apoia.se/campaigns/5db49c70e2d7737c4cd4e520%7C5db49c99193385a323d53d4c/user-campaign-about-photo%7CDisocodLogo-20200502_23062002.png",
            thumb = 'https://i.pinimg.com/originals/a0/50/1e/a0501e0c5659dcfde397299e4234e75a.gif';
        
        embed
            .setTimestamp()
            .setColor('#F0FF01')
            .setTitle(`**SORTEIO ${args}**`.toUpperCase())
            .setThumbnail(apoiador.avatar || thumb)
            .setDescription(`Vamos dar uma salva de palmas ao apoiador(a) ${apoiador.nome} ! Parabéns pelo prêmio!!!`)
            .addField("CONCURSO", apoiador.concurso, true)
            .addField("NOME DO VENCEDOR", apoiador.nome, true)
            .addField("CUPOM VENCEDOR", apoiador.cupom, true)
            .setImage("https://media1.tenor.com/images/08f87711d12de6e82eac9659caedea8a/tenor.gif")
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky`, logo);
        return embed;
    },

    messageDM: async function(apoiador, args) {
        let embed = new MessageEmbed(),
            logo  = "https://s3.amazonaws.com/assets.apoia.se/campaigns/5db49c70e2d7737c4cd4e520%7C5db49c99193385a323d53d4c/user-campaign-about-photo%7CDisocodLogo-20200502_23062002.png";
        
        embed
            .setTimestamp()
            .setColor('#F0FF01')
            .setTitle(`**SORTEIO ${args}**`.toUpperCase())
            .setThumbnail(apoiador.avatar)
            .setDescription(`Não apague esta mensagem. Este cupom será necessário para retirada do prềmio, caso seja contemplado.`)
            .addField("CONCURSO", apoiador.concurso, true)
            .addField("CUPOM", apoiador.cupom, true)
            .addField("APOIADOR(A)", apoiador.nome, true)
            .attachFiles(['./comandos/assets/loto/ticket.png'])
            .setImage("attachment://ticket.png")
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky`, logo);
        return embed;
    },

    verificaVIP: async function(message) {
        
        const salaLogs  = await message.guild.channels.cache.get('698758957845446657'),
              chatGeral = await message.guild.channels.cache.get('603723288757403648'),
              discBeta  = '695833895848902677',
              GarticMod = '704448465853349979',
              vipID     = '701655470141603911',
              ouroID    = '706706714766082060',
              prataID   = '706706548998668370';
              
        let dia       = new Date().getDate(),
            mes       = new Date().getMonth() + 1,
            filtroDia = f => f.dia <= dia || (mes===2 && f.dia>=28),
            filtroMes = f => f.mes < mes, 
            VIPs      = await dbListVIPs(),
            listaIDs  = [];
        
        if(VIPs === undefined)
            return;

        if(VIPs.length === 0)
            return;

        VIPs = VIPs.filter(filtroMes);
        VIPs = VIPs.filter(filtroDia);
        
        VIPs.forEach(async element => {
            let idNaLista = listaIDs.some(id => id === element.id);

            if(!idNaLista)
                listaIDs.push(element.id);
                await dbDeleteVIP(element.id);
        });

        listaIDs.forEach(id => {
            let membro = message.guild.members.cache.get(id),
                harry  = message.guild.members.cache.get('322421000153333761'),
                cargos = [ vipID, prataID, ouroID, discBeta, GarticMod ];
            
            cargos.forEach(role => {
                if(membro.roles.cache.some(cargo => cargo.id === role))
                    membro.roles.remove(role)
                        .then()
                        .catch(err => salaLogs.send(`Remove VIP error:\`\`\`${err}\`\`\``));
            })
            
            membro.send(`Seu beneficio mensal V.I.P encerrou hoje. Obrigado por apoiar a ThatSkyGameBrasil ❤️`)
                .then(salaLogs.send(`${harry} o plano V.I.P de ${membro.displayName} expirou.`))
                .catch(error => {
                    console.log(error);
                    chatGeral.send(`${membro} seu plano V.I.P expirou. Obrigado por sua contribuição ❤️`);
                    salaLogs.send(`Plano V.I.P de ${membro.displayName} expirou.\`\`\`${error}\`\`\``);
                });
        });
    }

}
