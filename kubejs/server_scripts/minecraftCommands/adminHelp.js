ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal('giveGold')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {                
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
            ctx.source.player.tell(Text.of('You have gained one gold'))
                ctx.source.server.runCommandSilent('kubejs persistent_data entity ' +ctx.source.player.username + ' scoreboard export playerGold ' + ctx.source.player.username + ' customScore');
                ctx.source.server.runCommandSilent('scoreboard players add ' + ctx.source.player.username + ' customScore 1');
                ctx.source.server.runCommandSilent('kubejs persistent_data entity ' + ctx.source.player.username + ' scoreboard import playerGold ' + ctx.source.player.username + ' customScore');

                // ctx.source.server.runCommandSilent('kubejs persistent_data entity @p scoreboard export playerGold @p customScore');
                // ctx.source.server.runCommandSilent('scoreboard players add @p customScore 1');
                // ctx.source.server.runCommandSilent('kubejs persistent_data entity @p scoreboard import playerGold @p customScore');
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;
    
    event.register(
        Commands.literal('resetRace')
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
            Utils.server.runCommandSilent(`tensura reset ${ctx.source.player.username} race`)
                


                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});