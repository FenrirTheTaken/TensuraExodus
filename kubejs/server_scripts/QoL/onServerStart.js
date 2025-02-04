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
        Utils.server.persistentData.divinity = [{god:"Ramoris", offering:0},{god:"Mijornil",offering:0},{god:"Gonko",offering:0},{god:"Xaero",offering:0},{god:"Sinistram Ultimus",offering:0},
            {god:"Myxvaras", offering:0},{god:"Visark",offering:0},{god:"Fowlfyr",offering:0},{god:"The Grandfather",offering:0}
        ]
    }
})
