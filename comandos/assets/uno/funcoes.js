const { 
    dbUnoCriar,     
    dbUnoBuscar,
    dbUnoListar,
    dbUnoEditar,
    dbUnoDelete,
} = require('../../../Routes/rotas');


module.exports = {
    
    //add jogador na base de dados
    addRank: async function(jogador) {
        let resposta = await dbUnoBuscar(jogador.id);
        console.log(`addRank: ${jogador.nome} => ${resposta}`)
        if(resposta===undefined) {
            await dbUnoCriar(jogador);
            return true;
        }
        return false;
    },


    //buscar jogador na base de dados
    buscaJogador: function(id) {
        let resposta = dbUnoBuscar(id);
        return resposta;
    },


    //atualiza dado do jogador 
    atualizar: function(jogador) {
        let resposta = dbUnoEditar(jogador);
        
        if(resposta) return true;
        else return false;
    },

    //deletar dado na base de dados
    deleteDado: function(jogador) {
        dbUnoDelete(jogador.id)
        return true
    },


    //listar todos jogadores
    listarDado: function() {
        let resposta = dbUnoListar();
        console.log(resposta)
        return resposta;
    },


    //Rank de pontuação dos jogadores
    unoRank: async function(embed) {
        let lista = dbUnoListar();
        let rankOrdenado = await lista.sort(function (a, b) {
            return (a.pontos < b.pontos) ? 1 : ((b.pontos < a.pontos) ? -1 : 0)
        });
        
        let tam = 0;
        let max = 9;
        rankOrdenado.forEach( jogador => {
            tam += 1;
        });
        if (tam === 0) {
            return "Ainda não coletei dados suficientes para montar o rank."
        }
        if(tam < max) {
            max = tam;
        }
        console.log(tam)
        for(i=0; i < max; i++){
            let jogador = rankOrdenado[i];
            console.log(i)
            embed.addField(`${i+1} - ${jogador.nome}`, `${jogador.pontos} pontos`, true);
        };
        embed
            .setTimestamp()
            .setColor('#FAFB2C')
            .setTitle("UNO!!! - RANK")
            .setThumbnail("https://i.ibb.co/NNyvBPm/champ.png")
            .setDescription("Imbatíveis! Esses nomes entrarão pra história!")
            .setFooter(`ThatSkyGameBrasil - UNO!!!`, `https://www.psxbrasil.com.br/trophyguide/uno/logo.png`);

        return embed
    }
}