const { dbAddVIP, dbEditVIP, dbListVIPs } = require('../Routes/rotaCadastroVIP');


class Apoiador {
    constructor (id=0, nome='', cupom='', concurso='', avatar='', dia=1) {
        this.id = id,
        this.dia = dia,
        this.nome = nome,
        this.cupom = cupom,
        this.avatar = avatar,
        this.concurso = concurso
    }
}


exports.run = async (client, message, args) => {
    await message.delete();

    const salaAtual  = message.channel,
          vipID      = '701655470141603911',
          vipOuroID  = '706706714766082060',
          vipPrataID = '706706548998668370',
          salaLogs   = client.channels.get("698758957845446657"),
          membroAlvo = message.mentions.members.first() || 
                       message.guild.members.get(args[0]);

    let dia   = args[1],
        mes   = args[2],
        nivel = args[3] || 'vip';
          

    
    if(args.length < 4) {
        if(args[0] === 'h' || args[0] === 'ajuda' || args[0] === undefined)
            return salaAtual.send('\`!addvip @menção dia mes nivel\`');
        return salaAtual.send('Faltando argumento: \`!addvip @menção dia mes nivel\`')
    }
    

    if(membroAlvo===undefined)
        return salaAtual.send('Erro: Faltou mencionar o membro para quem devo enviar o cupom.')
    
    if(isNaN(dia) || dia===undefined)
        return salaAtual.send(`Erro: ${dia} não é um dia válido.`)
    
    if(isNaN(mes) || mes===undefined)
        return salaAtual.send(`Erro: ${mes} não é um nome de sorteio válido.`)

    if(!isNaN(nivel))
        return salaAtual.send(`Erro: ${nivel} não é um nome de cargo válido.`)
    
    
    let membroVip = membroAlvo.roles.some(role => 
        role.id === vipID || role.id === vipPrataID || role.id === vipOuroID);
        

    if(nivel !== undefined) {
        let vip = '';
        (nivel==='vip') ? vip = vipID : (nivel==='prata') ? vip = vipPrataID : (nivel==='ouro') ? vip = vipOuroID : vip = null;

        if(vip === null)
            return salaLogs.send(`${message.author} ${nivel} não é um cargo válido, coloque o cargo manualmente.`);

        let cargo = await message.guild.roles.get(vip);

        if(!membroVip) {
            membroAlvo.addRole(cargo)
                .then( () => {
                    if(vip==='prata' || vip==='ouro')
                        membroAlvo.addRole('695833895848902677') //DiscordBeta
                            .then().catch(error => { 
                                salaLogs.send(`!addVip: erro ao add cargo\`\`\`${error}\`\`\``);
                                console.log(error) });

                    if(vip==='ouro')
                        membroAlvo.addRole('704448465853349979') //GarticMod
                            .then().catch(error => { 
                                salaLogs.send(`!addVip: erro ao add cargo\`\`\`${error}\`\`\``);
                                console.log(error) });
                })
                .catch(error => { 
                    salaLogs.send(`!addVip: erro ao add cargo\`\`\`${error}\`\`\``);
                    console.log(error)
                });
            }
    }//if nivel
        
    if(membroVip) { //renova ou adiciona data de expiração VIP
        let filtro = f => f.id === membroAlvo.id,
            VIPs   = await dbListVIPs(),
            vip    = '';
        
        if (VIPs === undefined)
            return;
            
        VIPs = VIPs.filter(filtro);
        (dia === 31) ? dia = 30 : dia;
        (nivel === undefined) ? vip = 'vip' : vip = nivel;

        if(VIPs.length === 0)
            return;

        VIPs.forEach( async element => 
            await dbEditVIP(element.id, vip, dia, mes) );
    } else {
        let dia = new Date().getDate(),
            mes = new Date().getMonth() + 1 ,
            vip = '';

        (dia === 31) ? dia = 30 : dia;
        (nivel === undefined) ? vip = 'vip' : vip = nivel.toLowerCase();

        await dbAddVIP(membroAlvo.id, membroAlvo.displayName, vip, dia, mes);
    }
    return;
}


exports.help = {
    name: "addvip"
}
