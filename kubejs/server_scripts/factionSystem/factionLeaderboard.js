
const $MAGAPI = Java.loadClass('com.github.manasmods.tensura.capability.ep.TensuraEPCapability')

// Quicksort Function
function part(arr, low, high) { 
    let p = arr[high]; 
    let i = low - 1; 
  
    for (let j = low; j <= high - 1; j++) { 
        // If current element is smaller than the pivot 
        if (arr[j].ep > p.ep) { 
            // Increment index of smaller element 
            i++; 
            // Swap elements 
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        } 
    } 
    // Swap pivot to its correct position 
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1; // Return the partition index 
} 
  
function quickSort(arr, low, high) { 

    if (low >= high) return; 
    let pi = part(arr, low, high); 
  
    quickSort(arr, low, pi - 1); 
    quickSort(arr, pi + 1, high); 
} 

function removePlayerEP(player, UUID){
    console.log(player)
    const p = Utils.server.persistentData.playerEP.find(EP =>(EP.player === player))
    const PartInst = $PACAPI.get(Utils.server)
    const PartMan = PartInst.getPartyManager()
    const ownerParty = PartMan.getPartyByMember(UUID)
    let ownerName = ""
    if (ownerParty !== null){
        ownerName = ownerParty.getOwner().getUsername()
    }
    const index = findFactionIndex(ownerName)
    if (p){
        Utils.server.persistentData.playerEP = Utils.server.persistentData.playerEP.filter(EP =>!(EP.player === player))
    }
    if (index > 0){
        Utils.server.persistentData.faction[index].ep -= p.ep
    }
    return ownerName
}
// Player Leaderboard
// 1st Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('player1')
            .executes(ctx => {
                const p = Utils.server.persistentData.playerEP[0]
                Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set player1 false ${p.player}`)




                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// 2nd Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('player2')
            .executes(ctx => {
                if(Utils.server.persistentData.playerEP.length > 1){
                    const p = Utils.server.persistentData.playerEP[1]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set player2 false ${p.player}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set player2 false None`)
                }

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// 3rd Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('player3')
            .executes(ctx => {
                if(Utils.server.persistentData.playerEP.length > 2){
                    const p = Utils.server.persistentData.playerEP[2]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set player3 false ${p.player}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set player3 false None`)
                }


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
// Sorted List
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('playerAll')
            .executes(ctx => {
                let s = ""
                let count = 0
                Utils.server.persistentData.playerEP.forEach(p => {
                    count += 1
                    s += count + '. ' + p.player +"\n" 
                })
                Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set playerall false ${s}`)



                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
// Faction Leaderboard

// 1st Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('faction1')
            .executes(ctx => {
                if(Utils.server.persistentData.faction.length > 0){
                    const f = Utils.server.persistentData.faction[0]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set faction1 false ${f.title}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set faction1 false None`)
                }




                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// 2nd Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('faction2')
            .executes(ctx => {
                if(Utils.server.persistentData.faction.length > 1){
                    const f = Utils.server.persistentData.faction[1]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set faction2 false ${f.title}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set faction2 false None`)
                }

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// 3rd Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('faction3')
            .executes(ctx => {
                if(Utils.server.persistentData.faction.length > 2){
                    const f = Utils.server.persistentData.faction[2]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set faction3 false ${f.title}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set faction3 false None`)
                }


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
// Sorted List
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('factionAll')
            .executes(ctx => {
                let s = ""
                let count = 0
                if(Utils.server.persistentData.faction.length > 0){
                    Utils.server.persistentData.faction.forEach(f => {
                        count += 1
                        s += count + '. ' + f.title +"\n" 
                    })
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set factionlist false ${s}`)
    
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set factionlist false None`)
                }


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// EP handling
PlayerEvents.loggedIn(event => {
    const playerEP = Math.round($MAGAPI.getEP(event.player))
    //event.server.runCommandSilent(`say ${playerEP}`)
    const UUID = event.player.getUuid()
    const owner = removePlayerEP(event.player.username, UUID)
    Utils.server.persistentData.playerEP.push({player:event.player.username, ep: playerEP})
    //event.server.runCommandSilent(`say ${owner}`)
    const index = findFactionIndex(owner)
    //event.server.runCommandSilent(`say ${index}`)
    if(!(index < 0)){
        Utils.server.persistentData.faction[index].ep += playerEP
        quickSort(Utils.server.persistentData.faction,0,Utils.server.persistentData.faction.length - 1)
    }
    quickSort(Utils.server.persistentData.playerEP,0,Utils.server.persistentData.playerEP.length - 1)

})


ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('populateLeaderboard')
            .executes(ctx => {
                ctx.source.player.runCommandSilent('player1')
                ctx.source.player.runCommandSilent('player2')
                ctx.source.player.runCommandSilent('player3')
                ctx.source.player.runCommandSilent('playerAll')


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('populateLeaderboardFaction')
            .executes(ctx => {
                ctx.source.player.runCommandSilent('faction1')
                ctx.source.player.runCommandSilent('faction2')
                ctx.source.player.runCommandSilent('faction3')
                ctx.source.player.runCommandSilent('factionAll')


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});