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

    // PlayerEvents.advancement(event => {
    //     // Get the player who achieved the advancement
    //     let player = event.player;
    
    //     // Give the player a diamond
    //     player.give('minecraft:diamond');
    // });


const unique = ['tensura:absolute_severance','tensura:berserk','tensura:berserker','tensura:bewilder','tensura:chef','tensura:chosen_one','tensura:commander','tensura:cook','tensura:creator','tensura:degenerate','tensura:divine_berserker','tensura:engorger','tensura:envy','tensura:falsifier',
    'tensura:fighter','tensura:fusionist','tensura:gluttony','tensura:godly_craftsman', 'tensura:gourmand','tensura:gourmet','tensura:great_sage','tensura:greed','tensura:guardian','tensura:healer','tensura:infinity_prison','tensura:lust','tensura:martial_master','tensura:mathematician','tensura:merciless',
    'tensura:murderer','tensura:musician','tensura:observer','tensura:oppressor','tensura:predator','tensura:pride','tensura:reaper','tensura:reflector','tensura:researcher','tensura:reverser','tensura:royal_beast','tensura:seer','tensura:severer','tensura:shadow_striker',
    'tensura:sloth','tensura:sniper','tensura:spearhead','tensura:starved','tensura:suppressor','tensura:survivor','tensura:thrower','tensura:traveler','tensura:tuner','tensura:unyielding','tensura:usurper','tensura:villain','tensura:wrath'
]
const rebirth_list = ['tensura:absolute_severance','tensura:berserk','tensura:berserker','tensura:bewilder','tensura:chef','tensura:chosen_one','tensura:commander','tensura:cook','tensura:creator','tensura:degenerate','tensura:divine_berserker','tensura:engorger','tensura:envy','tensura:falsifier',
    'tensura:fighter','tensura:gluttony','tensura:godly_craftsman','tensura:gourmet','tensura:great_sage','tensura:greed','tensura:guardian','tensura:healer','tensura:lust','tensura:martial_master','tensura:mathematician',
    'tensura:murderer','tensura:musician','tensura:observer','tensura:oppressor','tensura:predator','tensura:pride','tensura:reaper','tensura:reflector','tensura:researcher','tensura:reverser','tensura:royal_beast','tensura:seer','tensura:severer','tensura:shadow_striker',
    'tensura:sloth','tensura:sniper','tensura:spearhead','tensura:starved','tensura:suppressor','tensura:survivor','tensura:thrower','tensura:traveler','tensura:tuner','tensura:unyielding','tensura:usurper','tensura:villain','tensura:wrath']


function reset(player){
    Utils.server.runCommandSilent(`tensura reset ${player.username}`)
    player.persistentData.rebirthcount++
    if (player.persistentData.rebirthcount == 2){
        player.persistentData.saveCount = 1
    }
    else if(player.persistentData.rebirthcount == 3){
        player.persistentData.saveCount = 2
    }
    else if(player.persistentData.rebirthcount >= 4){
        player.persistentData.saveCount = 3
    }
   
}
PlayerEvents.advancement("tensura:reincarnated", (event) => {
    if (event.player.persistentData.rebirthcount > 0){
        let skil = event.player.nbt.get('ForgeCaps').get('manascore:skills').get('skills')
        event.player.persistentData.skil = []
        // event.player.persistentData.rebirthcount = 0


        skil.forEach(e => {
            if (unique.find(s => s == e.skill)){
                event.player.persistentData.skil.push(e.skill)
            }
        }
        )
        Utils.server.runCommandSilent(`tensura edit ${event.player.username} ability revoke ${event.player.persistentData.skil[0]}`)
        if (event.player.persistentData.rebirthcount > 2){
            let tempL = []
            for (let i = 0; i < 3 - event.player.persistentData.skilsave.length; i++){
                let temp = Math.floor(Math.random() * (rebirth_list.length-1))
                while(tempL.find(t => t === temp)!= null){
                    temp = Math.floor(Math.random() * (rebirth_list.length-1))
                }
                tempL.push(temp)
                Utils.server.runCommandSilent(`tensura edit ${event.player.username} ability grant ${rebirth_list[temp]}`)
            }
            event.player.persistentData.skilsave.forEach(s =>{
                Utils.server.runCommandSilent(`tensura edit ${event.player.username} ability grant ${String(s).replace(/"/g, '')}`)
            })
        }
        else{
            let tempL = []
            for (let i = 0; i < event.player.persistentData.rebirthcount+1; i++){
                let temp = Math.floor(Math.random() * (rebirth_list.length-1))
                while(tempL.find(t => t === temp)!= null){
                    temp = Math.floor(Math.random() * (rebirth_list.length-1))
                }
                tempL.push(temp)
                Utils.server.runCommandSilent(`tensura edit ${event.player.username} ability grant ${rebirth_list[temp]}`)
            }
    }
    event.player.persistentData.skilsave = []
    }

});
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
        .then(Commands.argument('skill', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'skill');
                if (ctx.source.player.persistentData.skil.find(s => s == first) && ctx.source.player.persistentData.skilsave.length < ctx.source.player.persistentData.saveCount){
                    ctx.source.player.persistentData.skilsave.push(first)
                    let temp = first.split(":")
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set ${temp[1].replace(/"/g, '')} false 2`)
                }
                else if (ctx.source.player.persistentData.skilsave.length >= ctx.source.player.persistentData.saveCount){
                    ctx.source.player.tell("You have already saved the max amount of skills allowed to you.")
                }
                else {
                    ctx.source.player.tell('Please input an Unique you actually have....')
                    ctx.source.player.tell(`${first}`)
                }

                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('unsaveSkill')
        .then(Commands.argument('skill', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'skill');
                if (ctx.source.player.persistentData.skil.find(s => s == first)){
                    ctx.source.player.persistentData.skilsave.remove(first)
                    ctx.source.player.persistentData.skilsave = ctx.source.player.persistentData.skilsave.filter(skill =>!(skill === first))
                    let temp = first.split(":")
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set ${temp[1].replace(/"/g, '')} false 1`)
                }
                else if (ctx.source.player.persistentData.skilsave.length >= ctx.source.player.persistentData.saveCount){
                    ctx.source.player.tell("You have already saved the max amount of skills allowed to you.")
                }
                else {
                    ctx.source.player.tell('Please input an Unique you actually have....')
                    ctx.source.player.tell(`${first}`)
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
                reset(ctx.source.player)
                ctx.source.player.persistentData.skilsave=[]
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('specificReset')
            .executes(ctx => {
                reset(ctx.source.player)
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

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('initializeSkillSelection')
            .executes(ctx => {
                let skil = ctx.source.player.nbt.get('ForgeCaps').get('manascore:skills').get('skills')
                ctx.source.player.persistentData.skil = []
                ctx.source.player.persistentData.skilsave = []

                // event.player.persistentData.rebirthcount = 0
        
        
                skil.forEach(e => {
                    if (unique.find(s => s == e.skill)){
                        ctx.source.player.persistentData.skil.push(e.skill)
                    }
                }
                )
                ctx.source.player.persistentData.skilsave=[]
                ctx.source.player.persistentData.skil.forEach(s => {
                    let temp = String(s).split(":")
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set ${temp[1].replace(/"/g, '')} false 1`)
                }
                );
                unique.forEach(s => {
                    let temp = String(s).split(":")
                    if (!(ctx.source.player.persistentData.skil.find(l => l == s))){
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set ${temp[1].replace(/"/g, '')} false 0`)
                    }
                })

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('getRebirthCount')
            .executes(ctx => {
                Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set currentrebirth false ${ctx.source.player.persistentData.rebirthcount}`)

                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('getSkillSave')
            .executes(ctx => {
                let sk = ""
                if (ctx.source.player.persistentData.skilsave != []){
                    ctx.source.player.persistentData.skilsave.forEach(s=>{
                        ctx.source.player.tell(`${s} Skill Saved`)
                        sk += s + "\n"
                    })
                }
                Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set savedskills false ${sk}`)
                if (sk === "" ){
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set savedskills false None`)
                }


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});