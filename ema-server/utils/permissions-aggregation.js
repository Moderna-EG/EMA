
const joinReceivePermissionsByProviders = (permissions, providers) => {

    for(let i=0;i<permissions.length;i++) {
        for(let j=0;j<providers.length;i++) {
            if(permissions[i].providerid == providers[j].id) {
                permissions[i].providercode = providers[j].code
                permissions[i].providername = providers[j].name
                break
            }
        }
    }

    return permissions
}

const joinExchangePermissionsByClients = (permissions, clients) => {

    for(let i=0;i<permissions.length;i++) {
        for(let j=0;j<clients.length;i++) {
            if(permissions[i].clientid == clients[j].id) {
                permissions[i].clientcode = clients[j].code
                permissions[i].clientname = clients[j].name
                break
            }
        }
    }

    return permissions
}

module.exports = { joinReceivePermissionsByProviders, joinExchangePermissionsByClients }