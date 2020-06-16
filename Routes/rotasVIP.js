const lowdb    = require(`lowdb`);
const FileSync = require('lowdb/adapters/FileSync');
const adapter  = new FileSync('./Routes/db_VIP.json');


const db = lowdb(adapter)


module.exports = {
    
    //Cria banco apoiadores
    dbVIP: function() {
        db.defaults({
            Vip: []
        }).write()
        return true;
    },


    //Adiciona apoiador
    dbAddVIP: function(apoiadorID, apoiadorNome, vip, dia, mes) {
        db.get('Vip')
            .push({
                id:   apoiadorID,
                nome: apoiadorNome,
                vip:  vip,
                dia:  dia,
                mes:  mes
            })
            .write();
        return true;
    },  


    //Lista todos os VIPs
    dbListVIPs: function() {
        let resposta = db.get('Vip')
            .__wrapped__
            .Vip;
        return resposta;
    },


    //busca dado no banco
    dbFindVIP: function(vipOuID) {
        let resposta = db.get('Vip');
        (isNaN(vipOuID)) ? resposta = resposta.find({ vip: vipOuID }).value() : 
                           resposta = resposta.find({ id:  vipOuID }).value()
        return resposta;
    },


    //editar dado no banco
    dbEditVIP: function(apoiadorID, vip, dia, mes) {
        db.get('Vip')
            .find({ id: apoiadorID })
            .assign({ 
                vip: vip,
                dia: dia,
                mes: mes
             })
            .write();
        return true;
    },


    //deletar dado
    dbDeleteVIP: function(apoiadorID) {
        db.get('Vip')
            .remove({id: apoiadorID})
            .write()
        return true;
    }

}