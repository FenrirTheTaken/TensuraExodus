
// Walpurgis
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('walpurgisStartVote')
            .executes(ctx => {
                Utils.server.persistentData.walpurgis = {walpurgison:1, invited:[ctx.source.player.username], votes:0}
                return 1; // Returning a value is required; 1 indicates success.
            })
        
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('isWalpurgis')
            .executes(ctx => {
                if (Utils.server.persistentData.walpurgis){
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1){
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set startwalpurgis false true`)
                    }

                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('inviteSub')
        .then(Commands.argument('player', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'player')
                Utils.server.persistentData.walpurgis.invited.push(first)
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('voteWalpurgis')
            .executes(ctx => {
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1){
                        Utils.server.persistentData.walpurgis.votes += 1
                        Utils.server.persistentData.walpurgis.invited.push(ctx.source.player.username)
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('denyWalpurgis')
            .executes(ctx => {
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1 && Utils.server.persistentData.walpurgis.invited.find(player => player === ctx.source.player.username))
                    {
                        Utils.server.persistentData.walpurgis.invited = Utils.server.persistentData.walpurgis.invited.filter(player =>!(player === ctx.source.player.username))
                        Utils.server.persistentData.walpurgis.votes -= 1
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('startWalpurgis')
            .executes(ctx => {
                if (Utils.server.persistentData.walpurgis){
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1){
                        Utils.server.persistentData.walpurgis.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in tensuradim:walpurgis run tp ${p} 8 -60 8`)
                        }
                        )
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set walpurgison false true`)
                    }  

                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('endWalpurgis')
            .executes(ctx => {
                if (Utils.server.persistentData.walpurgis){
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1){
                        Utils.server.persistentData.walpurgis.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in minecraft:overworld run tp ${p} 0 80 0`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set walpurgison false false`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set startwalpurgis false false`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set walpurgisvotes false false`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set subordinateinvited false false`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set invitedwalpurgis false `)
                            Utils.server.persistentData.walpurgis.invited = []
                            Utils.server.persistentData.walpurgis.walpurgison = 0
                        }
                        )
                    }  

                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('validVoteWalpurgis')
            .executes(ctx => {
                if (Utils.server.persistentData.walpurgis){
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1 && Utils.server.persistentData.walpurgis.votes >= 4){
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set walpurgisvotes false true`)
                    }
                    else if (Utils.server.persistentData.walpurgis.walpurgison === 1 && Utils.server.persistentData.walpurgis.votes < 4){
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set walpurgisvotes false false`)
                    }  

                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('getAttendingWalpurgis')
            .executes(ctx => {
                let s = ""
                if(Utils.server.persistentData.walpurgis.invited.length > 0){
                    Utils.server.persistentData.walpurgis.invited.forEach(f => {
                        s += f +"\n" 
                    })
                    let k = s.replace(/"/g, '')
                    Utils.server.tell(`${k}`)
                    console.log(k)
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set invitedwalpurgis false ${k}`)
    
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set invitedwalpurgis false ""`)
                }


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});