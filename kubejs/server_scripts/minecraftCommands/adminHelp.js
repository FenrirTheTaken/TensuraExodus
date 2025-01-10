ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal('giveGold')
            .executes(ctx => {
                ctx.source.player.tell(Text.of('You have gained one gold'))
                ctx.source.server.runCommandSilent('kubejs persistent_data entity ' +ctx.source.player.username + ' scoreboard export playerGold ' + ctx.source.player.username + ' customScore');
                ctx.source.server.runCommandSilent('scoreboard players add ' + ctx.source.player.username + ' customScore 1');
                ctx.source.server.runCommandSilent('kubejs persistent_data entity ' + ctx.source.player.username + ' scoreboard import playerGold ' + ctx.source.player.username + ' customScore');

                // ctx.source.server.runCommandSilent('kubejs persistent_data entity @p scoreboard export playerGold @p customScore');
                // ctx.source.server.runCommandSilent('scoreboard players add @p customScore 1');
                // ctx.source.server.runCommandSilent('kubejs persistent_data entity @p scoreboard import playerGold @p customScore');
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});