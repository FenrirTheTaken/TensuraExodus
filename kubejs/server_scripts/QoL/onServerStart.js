ServerEvents.loaded(e => {
    if (e.server.persistentData.faction){
        return;
    }
    else{
        Utils.server.persistentData.faction = [{}]
    }
})