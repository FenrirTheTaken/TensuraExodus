const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
// const faction = Java.loadClass('./factionClass.class')
function insertFactionData(title, description, owner){
    Utils.server.persistentData.faction.push({title:title,description:description, owner:owner.username, enemy:[], ep:$MAGAPI.getEP(owner)})
}
function findFaction(owner){
    return Utils.server.persistentData.faction.find(faction => faction.owner === owner)
}
function findFactionIndex(owner){
    console.log(owner)
    return Utils.server.persistentData.faction.findIndex((faction) => faction.owner === owner)
}
function removeFactionData(owner){
    console.log(owner)
    Utils.server.persistentData.faction = Utils.server.persistentData.faction.filter(faction =>!(faction.owner === owner))
}
function changeFactionLeader(index,owner){
    Utils.server.persistentData.faction[index] = {title:Utils.server.persistentData.faction[index].title,title:Utils.server.persistentData.faction[index].description,owner:owner,enemy:Utils.server.persistentData.faction[index].enemy, ep:Utils.server.persistentData.faction[index].ep }
}
function addEnemyFaction(index,enemy){
    const e = findFaction(enemy).title
    Utils.server.persistentData.faction[index].enemy.push(e) 
}
function removeEnemyFaction(index,enemy){
    Utils.server.persistentData.faction[index].enemy = Utils.server.persistentData.faction[index].enemy.filter(e => !(e === findFaction(enemy).title))
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands,  arguments: Arguments } = event;

    event.register(
        Commands.literal('makeFaction')
        .then(Commands.argument('title', Arguments.STRING.create(event))
        .then(Commands.argument('description', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'title');
                const second = Arguments.STRING.getResult(ctx,'description');
                ctx.source.player.runCommandSilent('openpac-parties create')
                // Utils.server.runCommandSilent(`openpac player-config for ${ctx.source.player.username} set claims.name "${first}"`)
                // Utils.server.runCommandSilent(`openpac player-config for ${ctx.source.player.username} set parties.name "${first}"`)
                 ctx.source.player.runCommandSilent(`openpac player-config for ${ctx.source.player.username} set claims.name "${first}"`)
                ctx.source.player.runCommandSilent(`openpac player-config for ${ctx.source.player.username} set parties.name "${first}"`)
                insertFactionData(first,second,ctx.source.player)
                const PartInst = $PACAPI.get(ctx.source.server)
                const PartMan = PartInst.getPartyManager()
                const party = PartMan.getPartyByOwner(ctx.source.player.getUuid())
                // const UUID = party.getId()
                // tempfaction = faction(first,second,UUID)
                const faction = findFaction(ctx.source.player.username)

                ctx.source.player.tell(Text.of(`You have made the Faction: ${faction.title}`))

                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal('testFaction')
            .executes(ctx => {
                const faction = findFaction(ctx.source.player.username)
            
                const PartInst = $PACAPI.get(ctx.source.server)
                const PartMan = PartInst.getPartyManager()
                const party = PartMan.getPartyByOwner(ctx.source.player.getUuid())
                const staffArray = party.getStaffInfoStream().toArray()
                const memberArray = party.getNonStaffInfoStream().toArray()
                const allyArray = party.getAllyPartiesStream().toArray()
                let staffString = ""
                let memberString = ""
                let allyString = ""
                let enemyString = ""
                staffArray.forEach(e => {
                    if (e.getUsername() !== ctx.source.player.username){
                        staffString += e.getUsername() + ", "
                    }
                }
                )
                memberArray.forEach(e => {
                    memberString += e.getUsername() + ", "
                }
                )
                allyArray.forEach(e=>{
                    allyString += findFaction(PartMan.getPartyById(e.getPartyId()).getOwner().getUsername()).title + ", "
                })
                faction.enemy.forEach(e=>{
                    enemyString += e + ", "
                })

                let finalStaff = staffString.slice(0, -2)
                let finalMember = memberString.slice(0, -2)
                let finalAlly = allyString.slice(0, -2)
                let finalEnemy = enemyString.slice(0, -2)


                const temp = `Description: ${faction.description}\nLeader: ${faction.owner}\nOfficers: ${finalStaff} \nMembers: ${finalMember} \nAllies:${finalAlly} \nEnemies: ${finalEnemy} `
        ctx.source.player.tell(Text.of(`=== [Faction: ${faction.title}] ===`).color("gold"))
        ctx.source.player.tell(Text.of(`${temp}`))



                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    function removeFactionData(owner){
        console.log(owner)
        Utils.server.persistentData.faction = Utils.server.persistentData.faction.filter(faction =>!(faction.owner === owner))
    }
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('deleteFaction')
        .then(Commands.argument('confirm', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'confirm');
                if (first !== "confirm"){
                    return;
                }
                ctx.source.player.runCommandSilent('openpac-parties destroy confirm')
                ctx.source.player.runCommandSilent(`openpac player-config for ${ctx.source.player.username} set claims.name ""`)
                removeFactionData(ctx.source.player.username)



                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('inviteMember')
        .then(Commands.argument('member', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member')
                ctx.source.player.runCommandSilent(`openpac-parties member invite ${first}`)



                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('promoteMember')
        .then(Commands.argument('member', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member');
                ctx.source.player.runCommandSilent(`openpac-parties member rank ADMIN ${first}`)
                ctx.source.player.runCommandSilent(`execute as ${first} run fmvariable set isstaff false true`)
                ctx.source.player.runCommandSilent(`execute as ${first} run fmvariable set ismember false false`)






                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('demoteMember')
        .then(Commands.argument('member', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member');

                ctx.source.player.runCommandSilent(`openpac-parties member rank MEMBER ${first}`)
                ctx.source.player.runCommandSilent(`execute as ${first} run fmvariable set ismember false true`)
                ctx.source.player.runCommandSilent(`execute as ${first} run fmvariable set isstaff false false`)




                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('kickMember')
        .then(Commands.argument('member', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member');
                ctx.source.player.runCommandSilent(`openpac-parties kick ${first}`)



                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('transferOwnershipFaction')
        .then(Commands.argument('player', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'player');

                const factionIndex = findFactionIndex(ctx.source.player.username)
                ctx.source.player.runCommandSilent(`openpac-parties transfer ${first} confirm` )
                changeFactionLeader(factionIndex,first)
                ctx.source.player.runCommandSilent(`execute as ${first} run fmvariable set isowner false true`)
                





                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('leaveFaction')
        .then(Commands.argument('confirm', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'confirm');

                ctx.source.player.runCommandSilent(`openpac-parties leave`)

                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('inFaction')
            .executes(ctx => {
                const PartInst = $PACAPI.get(ctx.source.server)
                const PartMan = PartInst.getPartyManager()
                const playerUUID = ctx.source.player.getUuid()
                const inFaction = PartMan.getPartyByMember(playerUUID)
                if (inFaction !== null){
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set infaction false true`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set infaction false false`)
                }



                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('enemyFaction')
        .then(Commands.argument('factionleader', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'factionleader');
                const index = findFactionIndex(ctx.source.player.username)
                addEnemyFaction(index,first)
                ctx.source.player.runCommandSilent(`openpac-parties ally remove ${first}`)
                


                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('allyFaction')
        .then(Commands.argument('factionleader', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'factionleader');
                const faction = findFaction(first).title
                const index = findFactionIndex(ctx.source.player.username)
                if (findFaction(ctx.source.player.username).enemy.find(item => item === faction) !== undefined) {
                    
                    removeEnemyFaction(index,first)
                }

                ctx.source.player.runCommandSilent(`openpac-parties ally add ${first}`)

                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});
