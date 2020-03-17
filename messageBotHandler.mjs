
exports.run = async (message) => {
    if(message.embeds) {
        //filtra mensagem com titulo CARGOS DISPONIVEIS
        const embedMsg = message.embeds.find(msg => msg.title === "**CARGOS DISPONÍVEIS**");
        if (embedMsg) {
            //adicionando reações 
            await embedMsg.message.react(`🚀`) //rocket
            .then(reaction => reaction.message.react(`🍎`) //apple
            .then(reaction => reaction.message.react(`🤖`) //robot
            .then(reaction => reaction.message.delete(15000))))
            .catch(err => console.error); 
        }
    }
}