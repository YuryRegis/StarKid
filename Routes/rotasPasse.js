const lowdb = require(`lowdb`);
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./Routes/db_603720312911167622.json');


const db = lowdb(adapter)


module.exports = {

    //Cria banco apoiadores
    dbPasse: function() {
        db.defaults({
            Passe: []
        }).write()
        return true;
    },


    //Adiciona apoiador
    dbAddPasse: function(apoiador) {
        db.get('Passe')
            .push({
                id: apoiador.id,
                nome: apoiador.nome,
                cupom: apoiador.cupom,
                concurso: apoiador.concurso
            })
            .write();
        return true;
    },  


    //Lista todos os passes
    dbListPasses: function() {
        let resposta = db.get('Passe')
            .__wrapped__
            .Passe;
        return resposta;
    },


    //busca dado no banco
    dbFindPasse: function(ticket) {
        let resposta = db.get('Passe')
            .find({ cupom: ticket })
            .value();
        return resposta;
    },


    //editar dado no banco
    dbEditPasse: function(apoiador, novoTicket, concurso, data) {
        db.get('Passe')
            .find({ cupom: apoiador.cupom })
            .assign({ 
                cupom: novoTicket,
                concurso: concurso,
                renova: data
             })
            .write();
        return true;
    },


    //deletar dado
    dbDeletePasse: function(ticket) {
        db.get('Passe')
            .remove({cupom: ticket})
            .write()
        return true;
    }

}