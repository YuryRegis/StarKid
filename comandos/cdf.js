const {RichEmbed} = require(`discord.js`);
const {getEmbed} = require(`../funcoes.js`);
const json = require(`./cards.json`);
const {getMember, getRandomInt} = require(`../funcoes.js`);


var jogadores = [];
var status = false;
const privadoID = "626214145158545409";
const dezoitoID = "674127280963977216";
var baralho = JSON.parse(JSON.stringify(json));
var cemiterio = [];


exports.help = {
    name: "cdf"
}

exports.run = async (client, message, args) => {
    
    const salaAtual = message.channel
    const validaAdmin = message.member.roles.some(r =>  r.name === "Staff" || r.name === "Admin")


    //Permissão apenas para Admin e Staff nas salas +18 e Privado
    if (salaAtual.id != privadoID && salaAtual.id != dezoitoID) {
        salaAtual.send("Comando `!cdf` não permitido nesta sala.");
        message.delete();
        return
    } if (!validaAdmin) {
        salaAtual.send("Você não possui permissão.");
        return message.delete();
    }

    
    //Comando para adicionar jogadores na brincadeira
    if (args[0].toLowerCase() === "add") {
        const addJogador = getMember(message, args[1]).user.username

        if (jogadores.some(j => j === addJogador)) {
            message.delete();
            salaAtual.send(`${addJogador} já está na lista de jogadores`);
            return console.log(`${addJogador} já está na lista de jogadores`);
        }

        jogadores.push(addJogador);
        console.log(`${addJogador} adicionado à lista de jogadores`);
        console.log (jogadores);
        message.delete();
    }
    

    //Comando para remover jogador
    if (args[0].toLowerCase() === "rmv") {
        const jogador = getMember(message, args[1]).user.username

        if (jogadores.some(j => j === jogador)) {
            jogadores.splice(jogadores.indexOf(jogador), 1);
            message.delete();
            return console.log(`${jogador} removido da lista de jogadores.`);
        }
        message.delete();
        console.log(`Erro ! ${jogador} não esta na lista de jogadores.`);       
    }


    //Comando para exibir quem está jogando
    if (args[0].toLowerCase() === "jogadores"){
        
        if (jogadores.length === 0){
            message.channel.send("Não existe nenhum jogador no momento.");
            console.log("Sem jogadores no momento");
            return message.delete()
        }
        const strJogadores = jogadores.join(", ");
        var embed = new RichEmbed()
            .setTitle("JOGADORES")
            .setDescription(strJogadores)
            .setTimestamp()
            .setColor('RANDOM')
            .setFooter(`ThatSkyGameBrasil - Tudo sobre Sky!`, client.user.displayAvatarURL);
        message.channel.send(embed);
        message.delete();
    }


    //Comando para iniciar o jogo
    if (args[0].toLowerCase() === "iniciar") {

        if(jogadores.length < 3){
            message.channel.send(`Existem menos de 3 pessoas jogando. 
            \nAdicione mais pessoas na lista de jogadores`);
            message.delete();
            return console.log("Existem menos de 3 pessoas jogando.");
        }
        if (status === true) {
            message.channel.send(`Já existe um jogo em andamento, encerre primeiro o jogo anterior.`);
            message.delete();
            return console.log(`Jogo já iniciado. Encerre o jogo anterior.`);
        }
        status = true;
        if (baralho.length <= 0) {
            baralho = cemiterio;
            cemiterio = [];
            await message.channel.send("Fim do baralho, embaralhando as cartas do cemitério...");
            message.channel.send("Cartas embaralhadas!");
        }
        const indice = getRandomInt(0,baralho.length-1);
        const carta = baralho[indice];
        baralho.splice(indice,1);
        cemiterio.unshift(carta);

        const atual = jogadores[0];
        const seguinte = jogadores[1];
        const anterior = jogadores[jogadores.length-1];
        var embed = new RichEmbed();

        message.channel.send(getEmbed(anterior,atual,seguinte,embed,carta));
        message.delete();
    }


    //Comando para passar para o próximo jogador
    if (args[0].toLowerCase() === "proximo" || args[0].toLowerCase() === "próximo"){
        
        if(jogadores.length < 3){
            message.channel.send(`Existem menos de 3 pessoas jogando. 
            \nAdicione mais pessoas na lista de jogadores`);
            message.delete();
            return console.log("Existem menos de 3 pessoas jogando.");
        }
        if (status == false){
            message.channel.send("Inicie o jogo primeiro. Use o comando `!cdf iniciar`");
            message.delete();
            return console.log("Necessário iniciar o jogo antes de usar este comando.")
        }
        if (baralho.length <= 0) {
            await message.channel.send("Fim do baralho, embaralhando as cartas do cemitério...");
            baralho = cemiterio;
            cemiterio = [];
            message.channel.send("Cartas embaralhadas!");
        }
        const indice = getRandomInt(0,baralho.length-1);
        const carta = baralho[indice];
        baralho.splice(indice,1);
        cemiterio.unshift(carta);
        const anterior = jogadores[0];
        const atual = jogadores[1];
        const seguinte = jogadores[2];
        var embed = new RichEmbed();
        
        jogadores.push(anterior);
        jogadores.shift();

        var msg = getEmbed(anterior, atual, seguinte, embed, carta);
        message.channel.send(msg);
        
        message.delete()
    }


    //Comando para voltar uma jogada (jagador anterior)
    if (args[0].toLowerCase() === "anterior") {
        if(jogadores.length < 3){
            message.channel.send(`Existem menos de 3 pessoas jogando. 
            \nAdicione mais pessoas na lista de jogadores`);
            message.delete();
            return console.log("Existem menos de 3 pessoas jogando.");
        }
        const carta = cemiterio[0];
        const anterior = jogadores[jogadores.length-2];
        const atual = jogadores[jogadores.length-1];
        const seguinte = jogadores[0];
        var embed = new RichEmbed();
        
        jogadores.unshift(atual);
        jogadores.pop();

        const msg = getEmbed(anterior, atual, seguinte, embed, carta);
        await message.channel.send("Voltei a jogada para o jogador **anterior**.");
        message.channel.send(msg);
        
        message.delete()
    }
    
    
    //Comando para trocar a carta para o jogador atual
    if (args[0].toLowerCase() === "trocar") {
        if(jogadores.length < 3){
            message.channel.send(`Existem menos de 3 pessoas jogando. 
            \nAdicione mais pessoas na lista de jogadores`);
            message.delete();
            return console.log("Existem menos de 3 pessoas jogando.");
        }
        if (baralho.length <= 0) {
            baralho = cemiterio;
            cemiterio = [];
            await message.channel.send("Fim do baralho, embaralhando as cartas do cemitério...");
            message.channel.send("Cartas embaralhadas!");
        }
        const indice = getRandomInt(0,baralho.length-1);
        const carta = baralho[indice];
        baralho.splice(indice,1);
        cemiterio.unshift(carta);
        const anterior = jogadores[jogadores.length-1];
        const atual = jogadores[0];
        const seguinte = jogadores[1];
        var embed = new RichEmbed();
        
        jogadores.unshift(atual);
        jogadores.pop();

        const msg = getEmbed(anterior, atual, seguinte, embed, carta);
        await message.channel.send("Troquei a carta para o jogador **atual**.");
        message.channel.send(msg);
        
        message.delete()
    } 


    //Comando para encerrar o jogo
    if (args[0].toLowerCase() === "fim") {
        jogadores = [];
        cemiterio = [];
        status = false;
        baralho = JSON.parse(JSON.stringify(json));
        message.channel.send(`Jogo finalizado com sucesso!`);
        message.delete();
    }

}//exports
