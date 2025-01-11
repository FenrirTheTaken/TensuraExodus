ServerEvents.loaded(e => {
    if (e.server.persistentData.faction){
        return;
    }
    else{
        Utils.server.persistentData.faction = []
    }
    if (e.server.persistentData.playerEP){
        return;
    }
    else{
        Utils.server.persistentData.playerEP = []
    }
})