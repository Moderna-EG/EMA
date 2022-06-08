const config = require('../config/config')
const isUserRoleValid = (role) => {
    for(let i=0;i<config.ROLES.length;i++) {
        if(role == config.ROLES[i]) {
            return true
        }
    }

    return false
}

module.exports = { isUserRoleValid }