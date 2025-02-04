const $DEMAPI = Java.loadClass('com.github.manasmods.tensura.capability.race.TensuraPlayerCapability')
function demonseed(play){
    return play.map(e => e.isTrueDemonLord()).orElse(0)
}
function heroegg(play){
    return play.map(e => e.isTrueHero()).orElse(0)

}
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('isElevated')
            .executes(ctx => {
                const play = $DEMAPI.getFrom(ctx.source.player)
                const dem = demonseed(play)
                const her = heroegg(play)
                //let skil = Utils.server.runCommand(`tensura get ${ctx.source.player.username} ability list skill unique`);
                //const temp = intrinsic(skil)

                if (dem == true){
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set isdemon false true`)
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set ishero false false`)
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set canrebirth false true`)
                }
                else if (her == true){
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set ishero false true`)
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set isdemon false false`)
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set canrebirth false true`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set ishero false false`)
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set isdemon false false`)
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set canrebirth false false`)
                }



                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});