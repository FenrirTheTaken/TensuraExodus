/**
 * Unavailable at all (aka unbalanced in a bad way)
-Infinity prison
-Merciless
-Fusionist

Available through quests (aka unbalanced in a manageable way)
-Chosen One / Pride / Predator / Spearhead / Unyielding
-Great Sage
-Creator
-Researcher / Godly Craftsman

Available through rebirth (aka unbalanced early, balanced late)
-Envy
-Greed
-Lust

Not sure
-Gourmand (proposal: Unavailable until fixed, Rebirth after fix)
-Gourmet (proposal: Rebirth)
-Degenerate (proposal: Rebirth or Quest)

 */


const unique = ['tensura:absoulte_severance','tensura:berserk','tensura:berskerker','tensura:bewilder','tensura:chef','tensura:chosen_one','tensura:commander','tensura:cook','tensura:creator','degenerate','divine_berserker','tensura:engorger','tensura:envy','tensura:falsifier',
    'fighter','fusionist','gluttony','godly_craftsman', 'tensura:gourmand','tensura:gourmet','tensura:great_sage','tensura:greed','tensura:guardian','tensura:healer','tensura:infinity_prison','tensura:lust','tensura:martial_master','tensura:mathematician','tensura:merciless',
    'tensura:murderer','tensura:musician','tensura:observer','tensura:oppressor','tensura:predator','tensura:pride','tensura:reaper','tensura:reflector','tensura:researcher','tensura:reverser','tensura:royal_beast','tensura:seer','tensura:severer','tensura:shadow_striker',
    'tensura:sloth','tensura:sniper','tensura:spearhead','tensura:starved','tensura:suppressor','tensura:survivor','tensura:thrower','tensura:traveler','tensura:tuner','tensura:unyielding','tensura:usurper','tensura:villain','tensura:wrath'
]
const rebirth_list = ['tensura:absoulte_severance','tensura:berserk','tensura:berskerker','tensura:bewilder','tensura:chef','tensura:chosen_one','tensura:commander','tensura:cook','tensura:creator','degenerate','divine_berserker','tensura:engorger','tensura:envy','tensura:falsifier',
    'fighter','fusionist','gluttony','godly_craftsman', 'tensura:gourmand','tensura:gourmet','tensura:great_sage','tensura:greed','tensura:guardian','tensura:healer','tensura:infinity_prison','tensura:lust','tensura:martial_master','tensura:mathematician','tensura:merciless',
    'tensura:murderer','tensura:musician','tensura:observer','tensura:oppressor','tensura:predator','tensura:pride','tensura:reaper','tensura:reflector','tensura:researcher','tensura:reverser','tensura:royal_beast','tensura:seer','tensura:severer','tensura:shadow_striker',
    'tensura:sloth','tensura:sniper','tensura:spearhead','tensura:starved','tensura:suppressor','tensura:survivor','tensura:thrower','tensura:traveler','tensura:tuner','tensura:unyielding','tensura:usurper','tensura:villain','tensura:wrath']


function reset(player){
    Utils.server.runCommandSilent(`tensura reset ${player.username}`)
    let skil = player.nbt.get('ForgeCaps').get('manascore:skills').get('skills')
    player.persistentData.skil = []
    player.persistentData.rebirthcount++
    skil.forEach(e => {
        if (unique.find(s => s == e.skill)){
            player.persistentData.skil.push(e.skill)
        }
    }
)
    Utils.server.runCommandSilent(`tensura edit ${player.username} ability revoke ${player.persistentData.skil[0]}`)
    if (player.persistentData.rebirthcount > 3){
        for (let i = 0; i < 3; i++){
            let temp = Math.floor(Math.random() * max) 
            Utils.server.runCommandSilent(`tensura edit ${player.username} grant ${rebirth_list[temp]}`)
        }
    }
    else{
        for (let i = 0; i < player.persistentData.rebirthcount; i++){
            let temp = Math.floor(Math.random() * max) 
            Utils.server.runCommandSilent(`tensura edit ${player.username} grant ${rebirth_list[temp]}`)
        }
}
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('uniqueSave')
            .executes(ctx => {
                const skil = ctx.source.player.nbt.get('ForgeCaps').get('manascore:skills').get('skills')
                ctx.source.player.persistentData.skil = []
                ctx.source.player.persistentData.skilsave=[]
                skil.forEach(e => {
                    if (unique.find(s => s == e.skill)){
                        ctx.source.player.persistentData.skil.push(e.skill)
                    }
                }
                )
                Utils.server.tell(`${skilHad}`)

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('uniqueSaved')
            .executes(ctx => {
                // Reset Player
                ctx.source.player.persistentData.skilsave.forEach(e => {
                    Utils.server.runCommandSilent(`tensura edit ${ctx.source.player.username} ability grant ${e}`)
                }
                )
                Utils.server.tell(`${skilHad}`)

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('saveSkill')
        .then(Commands.argument('player', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'player');
                if (ctx.source.player.persistentData.skil.find(s => s == first)){
                    ctx.source.player.persistentData.skilsave.push(first)
                }
                else {
                    ctx.source.player.tell('Please input an Unique you actually have....')
                }

                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('normalReset')
            .executes(ctx => {
                const skil = ctx.source.player.nbt.get('ForgeCaps').get('manascore:skills').get('skills')
                skil.forEach(e => {
                    if (unique.find(s => s == e.skill)){
                        skilHad.push(e.skill)
                    }
                }
                )
                ctx.source.player.persistentData.skilsave=[]
                Utils.server.tell(`${skilHad}`)

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('resetSaved')
            .executes(ctx => {
                const skil = ctx.source.player.nbt.get('ForgeCaps').get('manascore:skills').get('skills')
                skil.forEach(e => {
                    if (unique.find(s => s == e.skill)){
                        skilHad.push(e.skill)
                    }
                }
                )
                ctx.source.player.persistentData.skilsave=[]
                Utils.server.tell(`${skilHad}`)

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});