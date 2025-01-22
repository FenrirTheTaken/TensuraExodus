/*
* Author: FenrirTheTaken
* Date: 1/6/2025
* Description: Commands to welcome players.
*/

// Javascript to Make a 
PlayerEvents.loggedIn(e => {
      //Utils.server.runCommand('title @a[type=player,name=' + player.name.toString()+  ']title {"text":"Hi"}')

    if (e.player.persistentData.newPlayer === 1) return;
    else{
      e.player.persistentData.newPlayer = true;
      e.player.persistentData.playerGold = 0;
      e.player.persistentData.divinity = ""
      e.player.persistentData.skilsave=[]
      e.player.persistentData.rebirthcount = 0



      e.server.runCommandSilent('title ' + e.player.username + ' title  {"bold":"true","color":"#91101D","text":"Welcome"}')
      e.player.tell(Text.of('Please Look In FTB Quests in Your Inventory To Look at the Rules!!'))  
      //e.player.tell(Text.of('Hi'))
      // do something
    }
  })
