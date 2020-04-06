const lowdb = require(`lowdb`);
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./Routes/db_603720312911167622.json');


const db = lowdb(adapter)


module.exports = {

    //Cria banco do uno
    dbUno: function() {
        db.defaults({
            dbUno: []
        }).write()
        return true;
    },


    //Adiciona jogador no banco
    dbUnoCriar: function(jogador) {
        db.get('dbUno')
            .push({
                id: jogador.id,
                nome: jogador.nome,
                pontos: jogador.pontos })
            .write();
        return true;
    },  


    //Lista todos jogadores
    dbUnoListar: function() {
        let resposta = db.get('dbUno')
            .__wrapped__
            .dbUno;
        return resposta;
    },


    //busca dado no banco
    dbUnoBuscar: function(id) {
        let resposta = db.get('dbUno')
            .find({ id:id })
            .value();
        return resposta;
    },


    //editar dado no banco
    dbUnoEditar: function(jogador) {
        db.get('dbUno')
            .find({ id:jogador.id })
            .assign({ pontos: jogador.pontos })
            .write();
        return true;
    },


    //deletar dado
    dbUnoDelete: function(id) {
        db.get('dbUno')
            .remove({id:id})
            .write()
        return true;
    }

}