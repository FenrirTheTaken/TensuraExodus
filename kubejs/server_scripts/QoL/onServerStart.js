ServerEvents.loaded(e => {
    if (e.server.persistentData.faction){
        return;
    }
    else{
        Utils.server.persistentData.faction = []
    }
})
ServerEvents.loaded(e => {
    if (e.server.persistentData.playerEP){
        return;
    }
    else{
        Utils.server.persistentData.playerEP = []
    }
})
ServerEvents.loaded(e => {
    if (e.server.persistentData.divinity){
        return;
    }
    else{
        Utils.server.persistentData.divinity = []
    }
})