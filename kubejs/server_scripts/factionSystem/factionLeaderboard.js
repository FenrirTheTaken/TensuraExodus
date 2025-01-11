
// const faction = Java.loadClass('./factionClass.class')
const $MAGAPI = Java.loadClass('com.github.manasmods.tensura.capability.ep.TensuraEPCapability')

function insertFactionData(title, description, owner){
    Utils.server.persistentData.faction.push({title:title,description:description, owner:owner, enemy:[]})
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
    Utils.server.persistentData.faction[index] = {title:Utils.server.persistentData.faction[index].title,title:Utils.server.persistentData.faction[index].description,owner:owner,enemy:Utils.server.persistentData.faction[index].enemy }
}
function addEnemyFaction(index,enemy){
    const e = findFaction(enemy).title
    Utils.server.persistentData.faction[index].enemy.push(e) 
}
function removeEnemyFaction(index,enemy){
    Utils.server.persistentData.faction[index].enemy = Utils.server.persistentData.faction[index].enemy.filter(e => !(e === findFaction(enemy).title))
}


ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('faction1')
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

PlayerEvents.loggedIn(event => {
    const oof = $MAGAPI.getEP(event.player)
    event.server.runCommandSilent(`say ${oof}`)
})