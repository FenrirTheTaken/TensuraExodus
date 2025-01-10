ServerEvents.loaded(event => {
    let player = event.player;

    // Display the scoreboard in the sidebar when a player logs in
    event.server.runCommandSilent('scoreboard objectives add display dummy "Custom Score"');
    event.server.runCommandSilent('scoreboard objectives setdisplay sidebar display')
});