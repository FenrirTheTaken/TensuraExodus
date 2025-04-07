
// Walpurgis
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('walpurgisStartVote')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
            .executes(ctx => {
                const auth = Arguments.STRING.getResult(ctx,'authentication')
                if (auth !== '0mfiqzo1aays3c0'){
                    Utils.server.tell(`You are not authenticated to use this command.`)
                    return 1;
                }
                Utils.server.persistentData.walpurgis = {walpurgison:1, invited:[ctx.source.player.username], votes:1}
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
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
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
            .executes(ctx => {
                const auth = Arguments.STRING.getResult(ctx,'authentication')
                if (auth !== '0mfiqzo1aays3c0'){
                    Utils.server.tell(`You are not authenticated to use this command.`)
                    return 1;
                }
                const first = Arguments.STRING.getResult(ctx,'player')
                Utils.server.persistentData.walpurgis.invited.push(first)
                return 1; // Returning a value is required; 1 indicates success.
                
            })
        )
    )
    );
});
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('voteWalpurgis')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1 && !Utils.server.persistentData.walpurgis.invited.find(player => player === ctx.source.player.username)){
                        Utils.server.persistentData.walpurgis.votes += 1
                        Utils.server.persistentData.walpurgis.invited.push(ctx.source.player.username)
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('denyWalpurgis')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }                    
            if (Utils.server.persistentData.walpurgis.walpurgison === 1 && Utils.server.persistentData.walpurgis.invited.find(player => player === ctx.source.player.username))
                    {
                        Utils.server.persistentData.walpurgis.invited = Utils.server.persistentData.walpurgis.invited.filter(player =>!(player === ctx.source.player.username))
                        Utils.server.persistentData.walpurgis.votes -= 1
                    }  

                
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('startWalpurgis')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                if (Utils.server.persistentData.walpurgis){
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1){
                        Utils.server.persistentData.walpurgis.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in tensuradim:walpurgis run tp ${p} 8 -60 8`)
                            Utils.server.runCommandSilent(`gamemode adventure ${p}`)

                        }
                        )
                        Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set walpurgison false true`)
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
        Commands.literal('endWalpurgis')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                if (Utils.server.persistentData.walpurgis){
                    if (Utils.server.persistentData.walpurgis.walpurgison === 1){
                        Utils.server.persistentData.walpurgis.invited.forEach(p => {
                            Utils.server.runCommandSilent(`execute in minecraft:overworld run tp ${p} -53 71 62`)
                            Utils.server.runCommandSilent(`gamemode survival ${p}`)
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
        )
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