const json = require(`./assets/uno/uno.json`);
const {RichEmbed} = require(`discord.js`);
const {getRandomInt, getMember, encerrarPartida, somaPontos} = require(`../funcoes.js`);
const {comprarCarta, mostrarMao, mostrarMesa, pularJogador} = require(`../funcoes.js`);


class Jogador {
    constructor(nome="", mao=[], id="", salvo=false){
        this.salvo = salvo;
        this.nome = nome;
        this.mao = mao;
        this.id = id;
    }
}


var mesa = [];
var lotacao = 9;
var jogadores = [];
var contBaralho = 1;
var jogoAtivo = false;
var errStatus = false;
var jAtual = new Jogador();
var jAnterior = new Jogador();
var jSeguinte = new Jogador();
var statusCor = {"status": false, "cor":"", "id":"", "escolhido":false};
var statusPlus = {"status":false, "valor":0, "id":""}; 
const SalaID = "695833449205989376";  //ID da sala permitida para jogar
var baralho = JSON.parse(JSON.stringify(json));


exports.help = {
    name: "uno"
}


exports.run = async (client, message, args) => {
    const salaAtual = message.channel;
    const salaCorreta = await message.guild.channels.get(SalaID);
    const validaAdmin = await message.member.roles
            .some(r =>  r.name === "Staff" || r.name === "Admin");

    if (String(salaAtual.id) !== SalaID) {
        message.delete();
        return message.reply(`Você não pode usar este comando nesta sala de chat. Use o canal ${salaCorreta}, por gentileza`);
    }

    if(args[0] === undefined) {
        return message.reply(`Erro de sintaxe.\nVerifique o canal #comandos_bot para corrigir o comando.`);
    }

    if(jogoAtivo) {
        if(jogadores.length > lotacao) {
            let baralhoAdicional = JSON.parse(JSON.stringify(json));
            await salaAtual.send("Limite de jogadores atingido.");
            let m = await salaAtual.send("Adicionando baralho........");
            lotacao += 9;
            baralho = await baralho.push(baralhoAdicional);
            setTimeout(()=>{m.edit("OK !!! Novo baralho adicionado.")},2000);
        }
        
        if(jAnterior.salvo && jAnterior.mao.length!==1) {
            checarBaralho(2);
            jAnterior.salvo = false;
            baralho, jAnterior = comprarCarta(2, baralho, jAnterior);
            let punicao = "Parece que você falou **uno** sem ter 1 carta na mão. Punido com +2 cartas."
            let alvojAnterior = await message.guild.members.get(jAnterior.id);
            await alvojAnterior.send(punicao + mostrarMao(jAnterior));
            salaAtual.send(`🗣️ **${jAnterior.nome}** punido com +2 cartas por falar **uno** sem ter 1 carta na mão`);
            return;
        }
    }


    // comando para testes
    if(args[0].toLowerCase()==="teste") {
        message.delete();
        
        somaPontos(jogadores[0], jogadores)
        // var myGuild = await client.guilds.get(message.guild.id)
        // var myMbrGuild = myGuild.members
        // var members = []
        // myMbrGuild.forEach(mbr => { members.push(mbr.user.id) })
        // console.log(members.length)
        // members.forEach(async id => {
        //     var membr = await message.guild.members.get(id);
        //     //console.log(membr.nickname)
        //     if(membr.roles.some(rolé => rolé.name==="Beta")){
        //         //membr.roles.add('695833895848902677')
        //         membr.addRole('695833895848902677')
        //     }
        // })

        return 
    }


    //Entrar no jogo
    if (args[0].toLowerCase() === "add"|| args[0].toLowerCase() === "a") {
        message.delete();
        const membro = getMember(message, args[1]);
        var addJogador = membro.user.username;
        //return console.log(addJogador);
        if (jogadores.some(j => j.nome === addJogador)) {
            salaAtual.send(`${addJogador} já está na lista de jogadores`);
            return console.log(`${addJogador} já está na lista de jogadores`);
        }
        var alvo = message.author;
        var nomeAlvo = addJogador;
    
        if (addJogador !== alvo.username) {
            alvo = message.mentions.members.first();
            nomeAlvo = alvo.user.username;
            console.log('Alvo: ',nomeAlvo);
        }

        await alvo.send(`Estas são as cartas da sua mão:\n`).then()
            .catch(err => {
                salaAtual.send(`Não tenhho permissão para enviar mensagem privada para ${nomeAlvo}.`);
                salaAtual.send(`${nomeAlvo} não pode ser adicionado ao jogo. Verifique permissões.`);
                salaAtual.send(`\`\`\`${err}\`\`\``);
                console.log(err);
                errStatus=true;
            });
        if(errStatus) {
            errStatus = false;
            return;
        }
        var jogador = new Jogador(nomeAlvo, [], membro.user.id);
        
        baralho, jogador = comprarCarta(7, baralho, jogador);
        await alvo.send(mostrarMao(jogador)).then().catch(err => {salaAtual.send(`\`\`\`${err}\`\`\``)});
        salaAtual.send(`${nomeAlvo} suas cartas foram enviadas por mensagem privada.`);
        console.log(`UNO: Mão de ${nomeAlvo} enviada por DM`);
        
        await jogadores.push(jogador);  
        console.log(`UNO: ${nomeAlvo} adicionado à lista de jogadores`);
        salaAtual.send(`${nomeAlvo} adicionado à lista de jogadores`);
        return; // console.log(jogadores);
    }

    
    //Comando p/ iniciar partida
    if (args[0].toLowerCase() === "iniciar"|| args[0].toLowerCase() === "i") {
        message.delete();
        if(jogoAtivo) {
            return message.reply(`Já tem um jogo de UNO em andamento.`);
        }
        if(jogadores.length < 2) {
            return message.reply(`É preciso adicionar, **no mínimo**, 2 jogadores.`);
        }
        jogoAtivo = true;
        jAtual = jogadores[0];
        jSeguinte = jogadores[1];
        jAnterior = jogadores[jogadores.length-1];
        var indice = -1;
        var carta = {};
        do {
            indice = getRandomInt(0, baralho.length-1);
            carta = baralho[indice];
        } while (carta.id==="10"||carta.id==="11" ||carta.id==="12" || carta.id==="13" || carta.id==="14");
        var embed = new RichEmbed();
        embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, carta);
        if(errStatus) {
            errStatus = false;
            return console.log("UNO: Erro na função mostrarMesa");
        }
        mesa.unshift(carta);
        baralho.splice(indice,1);
        await salaAtual.send(embed);
        return salaAtual.send(`Aguardando ${jAtual.nome} jogar...`);
    }   


    //Comando para exibir quem está jogando
    if (args[0].toLowerCase() === "jogadores"|| args[0].toLowerCase() === "jgd") {
        
        if (jogadores.length === 0){
            message.channel.send("Não existe nenhum jogador no momento.");
            console.log("UNO: Sem jogadores no momento");
            return message.delete();
        }
        var strJogadores = "";
        for(i=0; i<jogadores.length; i++){
            strJogadores += `${jogadores[i].nome}, `;
        }
        var embed = new RichEmbed()
            .setTitle("JOGADORES")
            .setDescription(strJogadores)
            .addField("Total de jogadores", jogadores.length, true)
            .addField("Total de baralhos", contBaralho, true)
            .setTimestamp()
            .setColor('RANDOM')
            .setFooter(`ThatSkyGameBrasil - UNO!!!`, `https://www.psxbrasil.com.br/trophyguide/uno/logo.png`);
        message.channel.send(embed);
        message.delete();
    }
    

    //Comprar carta do baralho
    if (args[0].toLowerCase() === "comprar"|| args[0].toLowerCase() === "cp") {
        message.delete();
        if (jogoAtivo) {
            if(jogadores[0].salvo) {
                jogadores[0].salvo = false;
            }
            if(jogadores[0].nome === message.author.username) {
                if(statusPlus.status) {
                    checarBaralho(statusPlus.valor);
                    baralho, jogadores[0] = comprarCarta(statusPlus.valor, baralho, jogadores[0]);
                    var msg = `Você comprou ${statusPlus.valor} carta. Esta é sua mão atual:\n`;
                    message.author.send(msg + mostrarMao(jogadores[0]));
                    message.reply(`comprou ${statusPlus.valor} cartas e passou a sua vez.`);

                    statusPlus.status = false;
                    statusPlus.valor = 0;
                    
                    jogadores = pularJogador(jogadores);
                    jAnterior = jogadores[jogadores.length-1];
                    jSeguinte = jogadores[1];
                    jAtual = jogadores[0];

                    var embed = new RichEmbed();
                    embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
                    await salaAtual.send(embed);
                    return salaAtual.send(`Aguardando ${jAtual.nome} fazer sua jogada...`);
                }
                if(statusCor.status) {
                    var alvo = client.users.get(statusCor.id);
                    message.reply(`estamos aguardando o ${alvo} escolher uma **cor** com o comando \`\`\`!uno cor\`\`\``);
                    return;
                }
                checarBaralho(1);
                baralho, jogadores[0] = comprarCarta(1, baralho, jogadores[0]);
                var msg = 'Você comprou 1 carta. Esta é sua mão atual:\n';
                message.author.send(msg + mostrarMao(jogadores[0]));
                message.reply(`comprou uma carta. Caso ainda não tenha carta para jogar, pule a sua vez.`);
                return;
            }
            return  message.reply(`você só pode comprar na sua vez de jogar.`);
        }
        return message.reply("O jogo parece não estar ativo no momento.");
    }


    //Aguarda escolha da cor, caso esteja pendente
    if(args[0].toLowerCase()==="cor"|| args[0].toLowerCase() === "c") {
        message.delete();
        if(!statusCor.status) {
            return message.reply(`você não pode usar este comando no momento`);
        }
        if(message.author.id!==statusCor.id) {
            var nome = client.users.get(statusCor.id)
            nome = nome.user.username;
            return message.reply(`Estamos aguardando ${nome} escolher uma cor.`);
        }
        if(args.length<2) {
            var exemplo = " Exemplo: ```!uno cor azul```";
            return message.reply(`voce precisa dizer a cor escolhida` + exemplo);
        }
        var cor = args[1].toUpperCase();
        if(cor==="AZUL" || cor==="VERDE" || cor==="AMARELO" || cor==="VERMELHO") {
            statusCor.cor = cor;
            statusCor.status = false;
            var nome = message.author.username;
            return salaAtual.send(`${nome} escolheu a cor **${cor}** para seguir o jogo`);
        }
        var exemplo = "```AZUL  | VERDE  |  AMARELO | VERMELHO```";
        return message.reply(`${cor} não é uma cor válida. As cores válidas são:` + exemplo);
    }


    //Jogar carta da mão
    if(args[0].toLowerCase() === "jogar"|| args[0].toLowerCase() === "j") {
        message.delete();
        jAtual = jogadores[0];
        
        if (!jogoAtivo) {
            return message.reply('Parece que o jogo ainda não começou.');
        }
        if(jAtual.id !== message.author.id){
            return message.reply(`aguarde sua vez, agora **${jAtual.nome}** está jogando...`);
        }
        
        var carta = {};
        var indice = -1;
        args.splice(0,1);
        var cartas = jAtual.mao;
        var palavraProcurada = args.join(" ").toLowerCase();
        for(i=0; i<cartas.length; i++) {
            var cartaMao = cartas[i];
            console.log(cartaMao.titulo, palavraProcurada);
            console.log(cartaMao.titulo.toLowerCase()===palavraProcurada.toLowerCase());
            if (palavraProcurada === cartaMao.titulo.toLowerCase()) {

                indice = i;     //encontrei a carta
                carta = cartaMao;
            }
        }
        if (indice===-1) {      //não encontrei a carta
            message.reply(`não encontrei a carta ${palavraProcurada} na sua mão.`);
            return salaAtual.send(`Aguardando ${jAtual.nome} jogar...`);
        }
        if (carta.titulo === "+4") {
            if(statusPlus.status){
                if(statusPlus.id!=="13") {
                    return message.reply("você não pode cubrir a carta +2 com um +4.");
                }
            }
            if(cartas.length===1) {
                message.reply("Não pode acabar a partida usando carta especial.")
                return salaAtual.send('Use o comando \`!uno comprar\`');
            }
            mesa.unshift(carta);
            cartas.splice(indice,1);
            jAtual.mao = cartas;
            jogadores[0] = jAtual;
            message.author.send(`Descartou \`${carta.titulo}\`. Sua mão agora esta assim:\n`+mostrarMao(jAtual));
            salaAtual.send(`${jAtual.nome} jogou a carta ${carta.titulo}. Cuide-se!`);
            
            statusPlus.valor += 4;
            statusPlus.status = true;
            statusPlus.id = carta.id;
        
            var alvo = client.users.get(jSeguinte.id);
            
            statusCor.status = true;
            statusCor.id = message.author.id;

            // jogadores = pularJogador(jogadores);
            jogadores = pularJogador(jogadores);
            jAnterior = jogadores[jogadores.length-1];
            jSeguinte = jogadores[1];
            jAtual = jogadores[0];
            
            var embed = new RichEmbed();
            embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
            await salaAtual.send(embed);
            salaAtual.send(`${alvo} use o comando \`!uno comprar\` ou jogue outro **+4** para cobrir.`);
            return;
        }
        if(carta.id === "14") {  //carta Wild
            if(statusPlus.status) {
                message.reply(`você só pode usar o comando \`!uno comprar\` ou cobrir a carta da mesa.`);
                return;
            }
            if(cartas.length===1) {
                message.reply("Não pode acabar a partida usando carta especial.")
                return salaAtual.send('Use o comando \`!uno comprar\`');
            }
            mesa.unshift(carta);
            cartas.splice(indice,1);
            jAtual.mao = cartas;
            jogadores[0] = jAtual;
            message.author.send(`Descartou \`${carta.titulo}\`. Sua mão agora esta assim:\n`+mostrarMao(jAtual));
            message.reply(`use o comando \`!uno cor\` seguido da sua cor escolhida para continuar.`);

            statusCor.status = true;
            statusCor.id = message.author.id;

            jogadores = pularJogador(jogadores);
            jAnterior = jogadores[jogadores.length-1];
            jSeguinte = jogadores[1];
            jAtual = jogadores[0];

            var embed = new RichEmbed();
            embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
            await salaAtual.send(embed);
            return salaAtual.send(`Aguardando um jogador escolher uma cor para ${jAtual.nome} fazer sua jogada...`);
        }
        if(statusCor.status) {
            if(statusCor.cor==="") {
                var alvo = client.users.get(statusCor.id);
                message.reply(`estamos aguardando o ${alvo} escolher uma **cor** com o comando \`\`\`!uno cor\`\`\``);
                return;
            }
        }
        var cartaMesa = mesa[0];
        if(cartaMesa.id===carta.id || cartaMesa.cor===carta.cor || carta.cor===statusCor.cor) {
            if (carta.id==="12") {  //+2
                if(statusPlus.status){
                    if(statusPlus.id !== carta.id) {
                        message.reply(`você só pode usar o comando \`!uno comprar\` ou cobrir com outro **+2**.`);
                        return;
                    }
                }
                if(statusCor.cor!=="") {
                    statusCor.status = false;
                    statusCor.cor="";
                }
                mesa.unshift(carta);
                cartas.splice(indice,1);
                jAtual.mao = cartas;
                jogadores[0] = jAtual;
                message.author.send(`Descartou \`${carta.titulo}\`. Sua mão agora esta assim:\n`+mostrarMao(jAtual));
                salaAtual.send(`${jAtual.nome} jogou a carta ${carta.titulo}. Cuide-se!`);

                statusPlus.valor += 2;
                statusPlus.status = true;
                statusPlus.id = carta.id;

                // if(!espiarMao(jSeguinte, mesa[0])) {
                //     baralho, jSeguinte = comprarCarta(statusPlus.valor, baralho, jSeguinte);

                //     var msg = mostrarMao(jSeguinte);
                //     var alvo = client.users.get(jSeguinte.id);
                //     await alvo.send(`${jAtual.nome} jogou um **+2** para você. Sua mão agora esta assim:`+msg)
                //         .catch(err => { salaAtual.send(`\`\`\`${err}\`\`\``) });
                    
                //     statusPlus.valor = 0;
                //     statusPlus.status = false;

                //     jogadores = pularJogador(jogadores);
                //     jogadores = pularJogador(jogadores);
                    // jAnterior = jogadores[jogadores.length-1];
                    // jSeguinte = jogadores[1];
                    // jAtual = jogadores[0];

                //     var embed = new RichEmbed();
                //     embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
                //     await salaAtual.send(embed);
                //     salaAtual.send(`${jAnterior.nome} comprou ${statusPlus.valor} cartas e perdeu sua vez.`);
                // }
                jogadores = pularJogador(jogadores);
                jAnterior = jogadores[jogadores.length-1];
                jSeguinte = jogadores[1];
                jAtual = jogadores[0];

                var embed = new RichEmbed();
                embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
                await salaAtual.send(embed);

                if(cartas.length===0) {
                    var embed = new RichEmbed;
                    encerrarPartida(client, jAnterior, embed);
                    await salaAtual.send(embed);
                    return reset();
                }
                salaAtual.send(`${jAtual.nome} use o comando \`!uno comprar\` ou jogue outro **"+2"** para cobrir.`);
                return;
            }

            if (statusPlus.status) {
                message.reply(`você só pode usar o comando \`!uno comprar\` ou cobrir a carta da mesa.`);
                return;
            }

            if (carta.id === "10") {  //Reverse
                if(statusCor.cor!=="") {
                    statusCor.status = false;
                    statusCor.cor="";
                }
                mesa.unshift(carta);
                cartas.splice(indice,1);
                jAtual.mao = cartas;
                jogadores[0] = jAtual;
                message.author.send(`Descartou \`${carta.titulo}\`. Sua mão agora esta assim:\n`+mostrarMao(jAtual));
                salaAtual.send(`${jAtual.nome} jogou a carta ${carta.titulo}. Inverteu o sentido!\n` +
                    `Use \`!uno jogadores \` para verificar a ordem dos jogadores.`);
                
                var infoAtual = jAtual;
                var aux = jogadores.splice(0, jogadores.length);
                aux.forEach(jogador => { jogadores.unshift(jogador) });

                jAtual = jogadores[0];
                jSeguinte = jogadores[1];
                jAnterior = jogadores[jogadores.length-1];
                
                var embed = new RichEmbed();
                embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
                await salaAtual.send(embed);

                if(cartas.length===0) {
                    var embed = new RichEmbed;
                    encerrarPartida(client, infoAtual, embed);
                    salaAtual.send(embed);
                    return reset();
                }
                return salaAtual.send(`Aguardando ${jAtual.nome} fazer a sua jogada...`)
            }
            if (carta.id === "11") {  //Skip
                if(statusCor.cor!=="") {
                    statusCor.status = false;
                    statusCor.cor="";
                }
                mesa.unshift(carta);
                cartas.splice(indice,1);
                jAtual.mao = cartas;
                jogadores[0] = jAtual;
                message.author.send(`Descartou \`${carta.titulo}\`. Sua mão agora esta assim:\n`+mostrarMao(jAtual));

                var infoJogador = jAtual;

                var alvo = client.users.get(jSeguinte.id);
                message.reply(`pulou a vez de ${alvo} com a carta ${carta.titulo}`);

                jogadores = pularJogador(jogadores);
                jogadores = pularJogador(jogadores);
                jAnterior = jogadores[jogadores.length-1];
                jSeguinte = jogadores[1];
                jAtual = jogadores[0];

                var embed = new RichEmbed();
                embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
                await salaAtual.send(embed);

                if(cartas.length===0) {
                    var embed = new RichEmbed;
                    encerrarPartida(client, infoJogador, embed);
                    salaAtual.send(embed);
                    return reset();
                }
                return salaAtual.send(`Aguardando ${jAtual.nome} fazer a sua jogada...`);
            }
            //Demais cartas
            if(statusCor.cor!=="") {
                statusCor.status = false;
                statusCor.cor="";
            }
            mesa.unshift(carta);
            cartas.splice(indice,1);
            jAtual.mao = cartas;
            jogadores[0] = jAtual;
            
            message.author.send(`Descartou \`${carta.titulo}\`. Sua mão agora esta assim:\n`+mostrarMao(jAtual));

            jogadores = pularJogador(jogadores);
            jAnterior = jogadores[jogadores.length-1];
            jSeguinte = jogadores[1];
            jAtual = jogadores[0];

            var embed = new RichEmbed();
            embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
            await salaAtual.send(embed);
            if(cartas.length===0) {
                var embed = new RichEmbed;
                encerrarPartida(client, jAnterior, embed);
                salaAtual.send(embed);
                return reset();
            }
            return salaAtual.send(`Aguardando ${jAtual.nome} fazer a sua jogada...`);
        }   
        var msg = `Carta inválida. Jogue uma carta **${cartaMesa.id}** OU qualquer cor **${cartaMesa.cor}**\n`;
        salaAtual.send(msg + "Caso não tenha carta válida use `!uno comprar` para comprar uma carta.");
        return;
    }


    //Pular sua vez
    if (args[0].toLowerCase() === "proximo" || args[0].toLowerCase() === "próximo" || args[0].toLowerCase() === "p") {
        message.delete();

        if (jogoAtivo) {
            if(jogadores[0].nome === message.author.username || validaAdmin) {
                if(statusPlus.status) {
                    message.reply(`voce não pode pular sua vez com um +2 ou +4 para você.` +
                    `Use o comando \`!uno comprar\` ou cubra a carta da mesa.`)
                }
                console.log(`UNO: ${jogadores[0].nome} pulou sua vez.`);
                message.reply(`pulou sua vez. Próximo jogador: ${jogadores[1].nome}`);
                
                jogadores = pularJogador(jogadores);
                jAnterior = jogadores[jogadores.length-1];
                jSeguinte = jogadores[1];
                jAtual = jogadores[0];

                embed = new RichEmbed();
                embed = mostrarMesa(jAnterior, jAtual, jSeguinte, embed, mesa[0]);
                await salaAtual.send(embed);
                return salaAtual.send(`Aguardando ${jAtual.nome} fazer a sua jogada...`);
            }
            return  message.reply(`você só pode pular a sua vez de jogar.`);
        }
        return message.reply("O jogo parece não estar ativo no momento.");
    }


    //comando para sair da partida
    if(args[0].toLowerCase()==="sair"|| args[0].toLowerCase() === "s") {
        if(jogadores.length===0) {
            return message.reply(`A lista de jogadores está vazia.`);
        }
        let aviso = "";
        let id = message.author.id;
        const mencao = await message.mentions.members.first();
        
        if(mencao !== undefined) {
            if(validaAdmin) {
                id = mencao.id
            } else return message.reply("apenas **Staff** pode excluir algúem do jogo.")
        }
        let alvoSair = await client.users.get(id);
        
        if(statusCor.status===true && statusCor.id===id) {
            aviso = `${alvoSair.nome} precisa escolher uma cor antes de abandonar a partida.\n`;
            salaAtual.send(aviso+`${alvoSair}, use o comando \`!uno cor\` para escolher uma cor.`);
            return;
        }
        let aux = [];
        let indice = -1;

        jogadores.forEach((jogador, index)=>{
            if(jogador.id===id) { 
                indice = index;
                aux = jogador.mao;
            }
        });    
        if(indice===-1) {
            return message.reply("você, ou a pessoa procurada, não se encontra na lista de jogadores atual.");
        }
        aux.forEach(carta => { baralho.push(carta) });
        jogadores.splice(indice, 1);

        return salaAtual.send(`${alvoSair} saiu da partida atual.`);
    }   


    //comando de ajuda
    if (args[0].toLowerCase() === "ajuda" || args[0].toLowerCase() === "h" )  {
        message.delete();
        let regras = await message.guild.channels.get("695643704236572793");
        message.reply(`Aqui vai uma ajudinha para os comandos:
        \`\`\`
        ╔════════════════╦══════════════════════╦═══════════════╗
        ║     COMANDO    ║        FUNÇÃO        ║ COMANDO CURTO ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno add       ║ Adiciona jogador     ║ !uno a        ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno iniciar   ║ Inicia o jogo        ║ !uno i        ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno jogadores ║ Exibe jogadores      ║ !uno jgd      ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno jogar     ║ Joga carta escolhida ║ !uno j        ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno comprar   ║ Compra carta(s)      ║ !uno cp       ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno proximo   ║ Pula sua vez         ║ !uno p        ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno cor       ║ Escolhe cor          ║ !uno c        ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno uno       ║ Salva jogador        ║ !uno u        ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno sair      ║ Sai do jogo          ║ !uno s        ║
        ╠════════════════╬══════════════════════╬═══════════════╣
        ║ !uno encerrar  ║ Finaliza partida     ║ !uno e        ║
        ╚════════════════╩══════════════════════╩═══════════════╝\`\`\`
        Não encontrou o que queria? Confira o canal ${regras}`)
        return;
    }
    

    //UNO !!!
    if (args[0].toLowerCase() === "uno"|| args[0].toLowerCase() === "u")  {
        message.delete();
        if (!jogoAtivo) {
            message.reply(`Não tem ninguém jogando UNO no momento.`);
            return;
        }
        const alvoUno = message.mentions.members.first();
        
        let indiceUno = -1;
        let idAutor = message.author.id;

        for(i=0; i<jogadores.length; i++){
            if(jogadores[i].id === idAutor){
                indiceUno = i;
            }
        }
        if(indiceUno===-1){
            return message.reply("não encontrei você na lista de jogadores." +
                "\nUse `!uno add` para entrar na partida.");
        }
        var requisitante = jogadores[indiceUno];
        if(alvoUno===undefined) {
            if(requisitante.nome === message.author.username) {
                if(requisitante.mao.length === 1){
                    if(requisitante.salvo) {
                        return message.reply(`você já está salvo. 👼`);
                    }    
                    requisitante.salvo = true;
                    return message.reply(`foi salvo!\nFalou **UNO** bem a tempo. 👍`);
                }
                if(requisitante.mao.length === 2 && idAutor===jAtual.id) {
                    requisitante.salvo=true;
                    return message.reply(`Se salvou ! 👼`)
                }
                return message.reply(`use UNO apenas quando tiver **uma carta** na mão.`);
            }
        }
        const nomeUno = alvoUno.user.username;

        for(i=0; i<jogadores.length; i++) {
            if (jogadores[i].nome === nomeUno) {
                const maoJogador = jogadores[i].mao;
                const quantidade = maoJogador.length;
                if (quantidade === 1) {
                    if(!jogadores[i].salvo) {
                        message.reply(`pegou ${alvoUno} desprevinido!\n${nomeUno} compra 2 cartas... Dorme não jovem!`);
                        baralho, jogadores[i] = comprarCarta(2, baralho, jogadores[i]);
                        var msg = `${message.author} fez você comprar 2 cartas com o comando UNO. Suas novas cartas são:\n`;
                        alvoUno.send(msg + mostrarMao(jogadores[i]))
                            .catch(err => {salaAtual.send(`\`\`\`${err}\`\`\``);
                        });
                        return;
                    }
                    return message.reply(`Foi por pouco! ${nomeUno} já está salvo. 👼`);
                }
                return message.reply(`O jogador ${nomeUno} possui ${quantidade} cartas na mão.`);
            }
        }
        console.log(`UNO: ${message.author.username} mencionou ${nomeUno} mas não foi  encontrado.`, jogadores);
        return message.reply(`tem certeza que ${nomeUno} esta jogando?`);
    }


    //Encerrar partida
    if (args[0].toLowerCase() === "encerrar"|| args[0].toLowerCase() === "e")  {
        if(validaAdmin && jogoAtivo) {
            return reset();
        }
        return message.reply("sem partida ativa no momento.");
} 


var checarBaralho = async function(quantidade) {
    if (baralho.length <= quantidade) {
        var aux = mesa.splice(1, mesa.length);
        baralho = baralho.concat(aux);
        if (baralho.length <= quantidade) {
            return addBaralho();
        }
    }
    return;
}

var addBaralho = function() {
    contBaralho += 1;
    var aux = JSON.parse(JSON.stringify(json));
    baralho = baralho.concat(aux);
    var msg = "UNO: +1 baralho adicionado ao jogo atual"
    console.log(msg);
    return msg;
}

var reset = function() {
    mesa = [];
    lotacao = 9;
    jogadores = [];
    contBaralho = 1;
    jogoAtivo = false;
    errStatus = false;
    jAtual = new Jogador();
    jAnterior = new Jogador();
    jSeguinte = new Jogador();
    statusCor = {"status": false, "cor":"", "id":""};
    statusPlus = {"status":false, "valor":0, "id":""}; 
    baralho = JSON.parse(JSON.stringify(json));
}