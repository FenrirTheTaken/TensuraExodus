// Round Table 
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('roundtableStartVote')
            .executes(ctx => {
                Utils.server.persistentData.roundtable = {roundtableon:1, invited:[ctx.source.player.username], votes:0}
                return 1; // Returning a value is required; 1 indicates success.
            })
        
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('isRoundtable')
            .executes(ctx => {
                if (Utils.server.persistentData.roundtable){
                    if (Utils.server.persistentData.roundtable.roundtableon === 1){
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set startroundtable false true`)
                    }
                    else{
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set startroundtable false false`)
                    }
                }
                else{
                    Utils.server.tell("Hi")
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set startroundtable false false`)
                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('voteRoundtable')
            .executes(ctx => {
                    if (Utils.server.persistentData.roundtable.roundtableon === 1){
                        Utils.server.persistentData.roundtable.votes += 1
                        Utils.server.persistentData.roundtable.invited.push(ctx.source.player.username)
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('getAttendingRoundtable')
            .executes(ctx => {
                let s = ""
                if(Utils.server.persistentData.faction.length > 0){
                    Utils.server.persistentData.faction.forEach(f => {
                        s += f.title +"\n" 
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

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('denyRoundtable')
            .executes(ctx => {
                    if (Utils.server.persistentData.roundtable.roundtableon === 1 && Utils.server.persistentData.roundtable.invited.find(player => player === ctx.source.player.username))
                    {
                        Utils.server.persistentData.roundtable.invited = Utils.server.persistentData.roundtable.invited.filter(player =>!(player === ctx.source.player.username))
                        Utils.server.persistentData.roundtable.votes -= 1
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('startRoundtable')
            .executes(ctx => {
                if (Utils.server.persistentData.roundtable){
                    if (Utils.server.persistentData.roundtable.roundtableon === 1){
                        Utils.server.persistentData.roundtable.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in tensuradim:theroundtable run tp ${p} 8 -60 8`)
                        }
                        )
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set roundtableon false true`)
                    }  

                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('endRoundtable')
            .executes(ctx => {
                if (Utils.server.persistentData.roundtable){
                    if (Utils.server.persistentData.roundtable.roundtableon === 1){
                        Utils.server.persistentData.roundtable.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in minecraft:overworld run tp ${p} 0 80 0`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set roundtableon false false`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set startroundtable false false`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set roundtablevotes false false`)
                            Utils.server.runCommandSilent(`execute as ${p} run fmvariable set subordinateinvited false false`)
                            Utils.server.persistentData.roundtable.invited = []
                            Utils.server.persistentData.roundtable.roundtableon = 0
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
        Commands.literal('validVoteRoundtable')
            .executes(ctx => {
                if (Utils.server.persistentData.roundtable){
                    if (Utils.server.persistentData.roundtable.roundtableon === 1 && Utils.server.persistentData.roundtable.votes >= 4){
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set roundtablevotes false true`)
                    }
                    else if (Utils.server.persistentData.roundtable.roundtableon === 1 && Utils.server.persistentData.roundtable.votes < 4){
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set roundtablevotes false false`)
                    }  

                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});