const jimp                      = require("jimp"),
{ RichEmbed }                   = require("discord.js"),
{ getRandomInt }                = require('../../../funcoes'),
{ dbListPasses, dbDeletePasse } = require('../../../Routes/rotasPasse');


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
        let embed = new RichEmbed,
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
        let embed = new RichEmbed,
            logo  = "https://s3.amazonaws.com/assets.apoia.se/campaigns/5db49c70e2d7737c4cd4e520%7C5db49c99193385a323d53d4c/user-campaign-about-photo%7CDisocodLogo-20200502_23062002.png";
        
        embed
            .setTimestamp()
            .setColor('#F0FF01')
            .setTitle(`**SORTEIO ${args}**`.toUpperCase())
            .setThumbnail(apoiador.avatar)
            .setDescription(`Vamos dar uma salva de palmas ao apoiador(a) ${apoiador.nome} ! Parabéns pelo prêmio!!!`)
            .addField("CONCURSO", apoiador.concurso, true)
            .addField("NOME DO VENCEDOR", apoiador.nome, true)
            .addField("CUPOM VENCEDOR", apoiador.cupom, true)
            .setImage("https://media1.tenor.com/images/4f586b8d5cdc536ada9889b58e6d91e8/tenor.gif")
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky`, logo);
        return embed;
    },

    messageDM: async function(apoiador, args) {
        let embed = new RichEmbed,
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
        const salaLogs = message.guild.channels.get('698758957845446657'),
              vipID    = '701655470141603911',
              ouroID   = '706706714766082060',
              prataID  = '706706548998668370';

        let dia      = new Date().getDate(),
            filtro   = f => f.renova === dia || ((f.renova===31)&&(dia===30)),
            cupons   = await dbListPasses(),
            listaIDs = [];
        
        cupons.filter(filtro);

        if(cupons.length === 0)
            return;
        
        cupons.forEach(async element => {
            let idNaLista = listaIDs.some(id => id === element.id);
            if(!idNaLista)
                listaIDs.push(element.id);
            await dbDeletePasse(element.cupom);
        });

        listaIDs.forEach(id => {
            let membro = message.guild.members.get(id);
            
            if(membro.roles.some(cargo=>cargo.id===vipID))
                membro.removeRole(vipID)
                    .then()
                    .catch(err => salaLogs.send(`Remove VIP error:\`\`\`${err}\`\`\``));
            else if(membro.roles.some(cargo=>cargo.id===prataID))
                membro.removeRole(prataID)
                    .then()
                    .catch(err => salaLogs.send(`Remove VIP error:\`\`\`${err}\`\`\``));
            else if(membro.roles.some(cargo=>cargo.id===ouroID))
                membro.removeRole(ouroID)
                    .then()
                    .catch(err => salaLogs.send(`Remove VIP error:\`\`\`${err}\`\`\``));
            
            membro.send(`Seu beneficio mensal V.I.P encerrou hoje, obrigado por apoiar a ThatSkyGameBrasil!`)
                .then(salaLogs.send(`Plano V.I.P de ${membro.displayName} expirou.`))
                .catch(error => {
                    console.log(error);
                    salaLogs.send(`Plano V.I.P de ${membro.displayName} expirou.\`\`\`${error}\`\`\``);
                });
        });
    }

}
