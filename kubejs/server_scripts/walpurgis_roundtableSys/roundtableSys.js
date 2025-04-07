// Round Table 
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('roundtableStartVote')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                Utils.server.persistentData.roundtable = {roundtableon:1, invited:[ctx.source.player.username], votes:0}
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
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
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                    if (Utils.server.persistentData.roundtable.roundtableon === 1){
                        Utils.server.persistentData.roundtable.votes += 1
                        Utils.server.persistentData.roundtable.invited.push(ctx.source.player.username)
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
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
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set intvitedroundtable false ${s}`)
    
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set invitedroundtable false None`)
                }


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('denyRoundtable')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                    if (Utils.server.persistentData.roundtable.roundtableon === 1 && Utils.server.persistentData.roundtable.invited.find(player => player === ctx.source.player.username))
                    {
                        Utils.server.persistentData.roundtable.invited = Utils.server.persistentData.roundtable.invited.filter(player =>!(player === ctx.source.player.username))
                        Utils.server.persistentData.roundtable.votes -= 1
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('startRoundtable')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                if (Utils.server.persistentData.roundtable){
                    if (Utils.server.persistentData.roundtable.roundtableon === 1){
                        Utils.server.persistentData.roundtable.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in tensuradim:theroundtable run tp ${p} 8 -60 8`)
                            Utils.server.runCommandSilent(`gamemode adventure ${p}`)
                        }
                        )
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set roundtableon false true`)
                    }  

                }
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('endRoundtable')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                if (Utils.server.persistentData.roundtable){
                    if (Utils.server.persistentData.roundtable.roundtableon === 1){
                        Utils.server.persistentData.roundtable.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in minecraft:overworld run tp ${p} -53 71 62`)
                            Utils.server.runCommandSilent(`gamemode survival ${p}`)
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
        )
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