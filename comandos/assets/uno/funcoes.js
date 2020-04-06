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

        if(resposta===undefined) {
            dbUnoCriar(jogador);
            return true;
        }
        return false;
    },


    //buscar jogador na base de dados
    buscaJogador: function(jogador) {
        let resposta = dbUnoBuscar(jogador.id);
        return resposta;
    },


    //atualiza dado do jogador 
    atualizar: function(jogador) {
        dbUnoEditar(jogador);
        return true;
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
        let max = 10;
        rankOrdenado.forEach( jogador => {
            tam += 1;
        });
        if (tam === 0) {
            return "Ainda não coletei dados suficientes para montar o rank."
        }
        if(tam < 10) {
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