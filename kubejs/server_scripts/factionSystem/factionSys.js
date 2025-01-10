

const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
// const faction = Java.loadClass('./factionClass.class')
function insertFactionData(title, description, owner){
    Utils.server.persistentData.faction.push({title:title,description:description, owner:owner})
}
function findFaction(owner){
    return Utils.server.persistentData.faction.find(faction => faction.owner === owner)
}
function findFactionIndex(owner){
    return Utils.server.persistentData.faction.findIndex(faction => faction.owner === owner)
}
function removeFactionData(owner){
    console.log(owner)
    Utils.server.persistentData.faction = Utils.server.persistentData.faction.filter(faction =>!(faction.owner === owner))
}
function changeFactionLeader(index,owner){
    Utils.server.persistentData.faction[index] = {title:Utils.server.persistentData.faction[index].title,title:Utils.server.persistentData.faction[index].description,owner:owner }
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands,  arguments: Arguments } = event;

    function insertFactionData(title, description, owner){
        Utils.server.persistentData.faction.push({title:title,description:description, owner:owner})
    }
    function findFaction(owner){
        return Utils.server.persistentData.faction.find(faction => faction.owner === owner)
    }

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
                insertFactionData(first,second,ctx.source.player.username)
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
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
    const { commands: Commands } = event;

    event.register(
        Commands.literal('testFaction')
            .executes(ctx => {
                const faction = findFaction(ctx.source.player.username)
            
                const PartInst = $PACAPI.get(ctx.source.server)
                const PartMan = PartInst.getPartyManager()
                const party = PartMan.getPartyByOwner(ctx.source.player.getUuid())

                const temp = `Description: ${faction.description}\nLeader: ${faction.owner}\nOfficers: None \nMembers: None \nAllies:None \nEnemies: None `
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
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
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
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('inviteMember')
        .then(Commands.argument('member', Arguments.STRING.create(event)))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member')
                ctx.source.player.runCommandSilent(`openpac-parties member invite ${first}`)



                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('promoteMember')
        .then(Commands.argument('member', Arguments.STRING.create(event)))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member');
                ctx.source.player.runCommandSilent(`openpac-parties member rank ADMIN ${first}`)




                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('demoteMember')
        .then(Commands.argument('member', Arguments.STRING.create(event)))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member');

                ctx.source.player.runCommandSilent(`openpac-parties member rank MEMBER ${first}`)



                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('kickMember')
        .then(Commands.argument('member', Arguments.STRING.create(event)))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'member');
                ctx.source.player.runCommandSilent(`openpac-parties kick ${first}`)



                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('transferOwnershipFaction')
        .then(Commands.argument('confirm', Arguments.STRING.create(event)))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'confirm');

                const factionIndex = findFactionIndex(ctx.source.player)
                ctx.source.player.runCommandSilent(`openpac-parties transfer ${first}`)
                changeFactionLeader(factionIndex,first)




                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const $PACAPI = Java.loadClass('xaero.pac.common.server.api.OpenPACServerAPI')
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('leaveFaction')
        .then(Commands.argument('confirm', Arguments.STRING.create(event)))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'confirm');

                ctx.source.player.runCommandSilent(`openpac-parties leave`)

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

