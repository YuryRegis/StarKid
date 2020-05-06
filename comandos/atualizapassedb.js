const { dbAtualiza } = require('../Routes/rotasPasse');


exports.run = async (client, message, args) => {
    await message.delete();

    await dbAtualiza();
    
    return;
}


exports.help = {
    name: "atualizapassedb"
}
