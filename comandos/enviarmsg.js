
exports.help = {
    name: "enviarmsg"
}

exports.run = (client, message, args) => {
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        if(!isNaN(args[0]) && !isNaN(args[1])) {
            let canal = client.channels.get(args[1]);
            let idusuario = canal.guild.members.get(args[0]).user;
            message.delete();
            return canal.send( `${idusuario}: ${args.slice(2).join(" ")}` );
        } else { 
            if( !isNaN(args[0]) ) {
                let canal = client.channels.get(args[0]);
                message.delete();
                return canal.send( args.slice(1).join(" ") )
            }
            else return message.reply( `${args[0]} não é um ID válido.` );
        } 
    }   
    else return message.reply(" você não tem permissão para usar este comando."); 
}
