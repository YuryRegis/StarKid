
exports.run = async (reaction, user) => {
    
    // captura emoji da reação para verificação
    var reacao = reaction.emoji.name;
    if (reacao === `🚀`){
        var chave = "Beta";
    } else if (reacao === `🍎`) {
        var chave = "Apple";
    } else if (reacao === `🤖`) {
        var chave = "Android";
    } else return; // retorna nada para caso de emoji diferente
    
    var cargo = reaction.message.guild.roles.find(role => role.name.toLowerCase() === chave.toLowerCase());
    var member = reaction.message.guild.members.find(member => member.id === user.id);

    // se o membro ja tiver o cargo selecionado, apague o mesmo
    if (member.roles.some(x => x.name === cargo.name)) {
        member.removeRole(cargo.id)
        .then(member => console.log(`${member.user.username} removeu o cargo ${cargo.name}`))
        .catch(err => console.log(err));
    } else { // caso contrario, adicione cargo selecionado
        member.addRole(cargo.id).then(member => {
            var nome = member.user.username;
            console.log(`${nome} adicionou o cargo ${chave}`)       
        }).catch(err => console.error)
    }
}