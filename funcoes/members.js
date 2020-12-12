const { verificaRoles } = require('../funcoes/roles'),
      getID            = require('../funcoes/ids.json');


module.exports = {

    verificaPerm: async function(member) {
        
        if( await verificaRoles(member, [getID.cargo.ADMIN, getID.cargo.STAFF, getID.cargo.MODERADOR]) )
             return true;
        else
            return false;
    },


    // recebe um tipo User e retorna um guildMember.
    userToMember: async function (user, message) {  
        const member = await message.guild.members.cache.get(user.id);
        return member;
    }
}