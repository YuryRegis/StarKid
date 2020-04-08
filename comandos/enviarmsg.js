
exports.help = {
    name: "enviarmsg"
}

exports.run = async (client, message, args) => {
    message.delete();
    
    if(message.member.roles.some(r => r.name === "Admin") || message.member.roles.some(r => r.name === "Staff")) {
        let mensaoCanal = /#/;
        let mensaoUsuario = /@/;

        if(!isNaN(args[0]) && !isNaN(args[1])) {
            let canal = client.channels.get(args[1]);
            let idusuario = canal.guild.members.get(args[0]).user;
        
            return canal.send( `${idusuario}: ${args.slice(2).join(" ")}` );
        } else { 
            if( !isNaN(args[0]) ) {
                let canal = client.channels.get(args[0]);
            
                return canal.send( args.slice(1).join(" ") )
            }
            if(mensaoUsuario.test(args[0]) && mensaoCanal.test(args[1])) {
                let alvoUser  = await message.mentions.members.first();
                let alvoCanal = await message.mentions.channels.first();

                return alvoCanal.send(`${alvoUser}: ${args.slice(2).join(" ")}`)
                    .then()
                    .catch(err => {message.channel.send(`Terminal\`\`\`${err}\`\`\``)});;
            }
            if(mensaoCanal.test(args[0])) {
                let alvoCanal = await message.mentions.channels.first();
                    
                return alvoCanal.send(`${args.slice(1).join(" ")}`)
                    .then()
                    .catch(err => {message.channel.send(`Terminal\`\`\`${err}\`\`\``)});
            }
            else return message.reply( `${args[0]} não é um ID válido.` );
        } 
    }   
    else return message.reply(" você não tem permissão para usar este comando."); 
}
