const lowdb = require(`lowdb`);
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./Routes/db_Drops.json');


const db = lowdb(adapter);


module.exports = {

    //Cria banco de codigos para dropar
    dbDrops: function() {
        db.defaults({
            Drops: []
        }).write()
        return true;
    },


    //Adiciona drop
    dbAddDrop: function(drop) {
        db.get('Drops')
            .push({
                id: drop.id,
                drop: drop.drop
            })
            .write()
        
        return true;
    },

    
    dbAtualiza: function(){
        db.update('count', n => n + 1)
            .write()
        return
    },


    //Lista todos os drops
    dbListDrops: function() {
        let resposta = db.get('Drops')
            .__wrapped__
            .Drops;
        return resposta;
    },


    //busca dado no banco
    dbFindDrop: function(drop) {
        let resposta = db.get('Drops')
            .find({ id: drop.id })
            .value();
        return resposta;
    },


    //editar dado no banco
    dbEditDrop: function(drop) {
        db.get('Drops')
            .find({ id: drop.id })
            .assign({ 
                id: drop.id,
                drop: drop.drop
             })
            .write();
        return true;
    },


    //deletar dado
    dbDeleteDrop: function(drop) {
        db.get('Drops')
            .remove({drop: drop.drop})
            .write()
        return true;
    }

}
