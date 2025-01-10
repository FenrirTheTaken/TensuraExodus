/////////////////////////
// Menu Implementation //
/////////////////////////

let MenuState = function(type, player) {
    this.player = player;
    this.type = type;
    this.page = 0;
    player.openChestGUI(type.title, 6, (gui) => this.gui = gui);
    this.showPage();
  };
  
  MenuState.prototype.showPage = function() {
    for (let slot of this.type.pages[this.page]) {
      let btn = this.gui.getSlot(slot.x, slot.y);
      btn.setItem(Item.of(slot.item).withName(slot.label));
      for (let event of ['LeftClicked', 'RightClicked', 'MiddleClicked', 'Swapped', 'Thrown', 'ShiftLeftClicked', 'ShiftRightClicked', 'DoubleClicked']) {
        let handler = slot['on' + event];
        handler && btn['set' + event](() => handler(this.player));
      }
    }
    let disabledItem = "minecraft:barrier";
    let enabledItem = "minecraft:slime_ball";
    let enabled = this.page > 0;
    this.gui.button(0, 5, enabled ? enabledItem : disabledItem, "Previous Page", () => this.prevPage());
    enabled = this.page < this.type.pages.length - 1;
    this.gui.button(8, 5, enabled ? enabledItem : disabledItem, "Next Page", () => this.nextPage());
    let pageNum = this.page + 1;
    this.gui.button(4, 5, Item.of("minecraft:paper", pageNum), "Page #" + pageNum, () => {});
  };
  
  MenuState.prototype.clearPage = function() {
    for (let slot of this.type.pages[this.page]) {
      let btn = this.gui.getSlot(slot.x, slot.y);
      btn.setItem("minecraft:air");
      btn.resetClickHandlers();
    }
  };
  
  MenuState.prototype.prevPage = function() {
    if (this.page <= 0) return;
    this.clearPage();
    --this.page;
    this.showPage();
  };
  
  MenuState.prototype.nextPage = function() {
    if (this.page >= this.type.pages.length - 1) return;
    this.clearPage();
    ++this.page;
    this.showPage();
  };
  
  let MenuType = function(title) {
    this.title = title;
    this.pages = [];
  };
  
  MenuType.prototype.getPage = function(i) {
    if (this.pages[i] === undefined)
      this.pages[i] = [];
    return this.pages[i];
  };
  
  MenuType.prototype.addSlot = function(slot) {
    this.getPage(slot.page).push(slot);
  };
  
  MenuType.prototype.show = function(player) {
    new MenuState(this, player);
  };
  
  ///////////////
  // Menu Data //
  ///////////////
  
  let ironMenu = new MenuType(Text.blue("Iron Menu"));
  ironMenu.addSlot({page: 0, x: 0, y: 0, label: "Unused", item: "minecraft:stone"});
  ironMenu.addSlot({page: 0, x: 4, y: 3, label: "Unused", item: "minecraft:stone"});
  ironMenu.addSlot({page: 0, x: 8, y: 0, label: "Unused", item: "minecraft:stone"});
  ironMenu.addSlot({page: 0, x: 4, y: 1, label: "The Eye", item: "minecraft:ender_eye",
    onLeftClicked: (player) => player.sendSystemMessage("Eye Left Clicked"),
    onRightClicked: (player) => player.sendSystemMessage("Eye Right Clicked")});
  ironMenu.addSlot({page: 1, x: 4, y: 0, label: "Unused", item: "minecraft:stone"});
  ironMenu.addSlot({page: 1, x: 2, y: 2, label: "Unused", item: "minecraft:stone"});
  ironMenu.addSlot({page: 1, x: 6, y: 2, label: "The Dirt", item: "minecraft:dirt",
    onThrown: (player) => player.sendSystemMessage("Dirt Thrown")});
  ironMenu.addSlot({page:2, x: 4, y: 2, label: "Explode", item: "minecraft:tnt",
    onLeftClicked: (player) => player.getLevel().createExplosion(player.x, player.y, player.z).explode()});
  
  let goldMenu = new MenuType(Text.red("Gold Menu"));
  goldMenu.addSlot({page: 0, x: 4, y: 2, label: "Random Stuff", item: "minecraft:stick"});
  goldMenu.addSlot({page: 1, x: 4, y: 2, label: "Random Stuff", item: "minecraft:dead_bush"});
  goldMenu.addSlot({page: 2, x: 4, y: 2, label: "Random Stuff", item: "minecraft:flint"});
  goldMenu.addSlot({page: 3, x: 2, y: 2, label: "Random Stuff", item: "minecraft:coal"});
  goldMenu.addSlot({page: 3, x: 4, y: 2, label: "Random Stuff", item: "minecraft:coal"});
  goldMenu.addSlot({page: 3, x: 6, y: 2, label: "Random Stuff", item: "minecraft:coal"});
  
  ItemEvents.rightClicked((event) => {
    if (event.item.id == 'minecraft:iron_ingot') ironMenu.show(event.player);
    else if (event.item.id == 'minecraft:gold_ingot') goldMenu.show(event.player);
  });

// BlockEvents.rightClicked(event => {
//     let player = event.player;
//     let block = event.block;

//     // Check if the player clicked a diamond block
//     if (block.id === 'minecraft:diamond_block') {
//         let chestPos = block.pos.offset(0, 1, 0); // Place chest above the clicked block

//         // Place a temporary chest
//         event.server.runCommandSilent(`setblock ${chestPos.x} ${chestPos.y} ${chestPos.z} minecraft:chest`);

//         // Add a custom tag to the chest
//         event.server.runCommandSilent(`data merge block ${chestPos.x} ${chestPos.y} ${chestPos.z} {CustomName:'{"text":"Custom Menu Chest"}',tag:{MenuTag:1b}`);

//         // Populate the chest with items representing menu options
//         event.server.runCommandSilent(`data merge block ${chestPos.x} ${chestPos.y} ${chestPos.z} {Items:[
//             {Slot:0b,id:"minecraft:diamond",Count:1b,tag:{display:{Name:'{"text":"Option 1","color":"gold"}'}}},
//             {Slot:1b,id:"minecraft:emerald",Count:1b,tag:{display:{Name:'{"text":"Option 2","color":"green"}'}}},
//             {Slot:2b,id:"minecraft:apple",Count:1b,tag:{display:{Name:'{"text":"Option 3","color":"red"}'}}}
//         ]}`);

//         // Notify the player
//         player.tell("A custom menu has been opened!");
//     }
// });



// ServerEvents.tick(event => {
//     let player = event.player;

//     // Check for specific items in the player's inventory
//     if (player.inventory.find(item => item.id === 'minecraft:diamond' && item.tag?.display?.Name === '{"text":"Option 1","color":"gold"}')) {
//         player.tell("You selected Option 1!");
//         // Perform actions for Option 1
//         player.inventory.remove(Item.of('minecraft:diamond', 1).withTag({display: {Name: '{"text":"Option 1","color":"gold"}'}}));
//     }

//     if (player.inventory.find(item => item.id === 'minecraft:emerald' && item.tag?.display?.Name === '{"text":"Option 2","color":"green"}')) {
//         player.tell("You selected Option 2!");
//         // Perform actions for Option 2
//         player.inventory.remove(Item.of('minecraft:emerald', 1).withTag({display: {Name: '{"text":"Option 2","color":"green"}'}}));
//     }

//     if (player.inventory.find(item => item.id === 'minecraft:apple' && item.tag?.display?.Name === '{"text":"Option 3","color":"red"}')) {
//         player.tell("You selected Option 3!");
//         // Perform actions for Option 3
//         player.inventory.remove(Item.of('minecraft:apple', 1).withTag({display: {Name: '{"text":"Option 3","color":"red"}'}}));
//     }
// });

// BlockEvents.rightClicked(event => {
//     let block = event.block;

//     // Check if the block is a chest with the custom tag
//     if (block.id === 'minecraft:chest') {
//         let blockData = event.server.runCommandSilent(`data get block ${block.pos.x} ${block.pos.y} ${block.pos.z}`);
//         if (blockData.includes('MenuTag:1b')) {
//             event.player.tell("You interacted with a custom menu chest!");
//         }
//     }
// });
// BlockEvents.rightClicked(event => {
//     let block = event.block;

//     // Check if the block is a chest with the custom tag
//     if (block.id === 'minecraft:chest') {
//         let blockData = event.server.runCommandSilent(`data get block ${block.pos.x} ${block.pos.y} ${block.pos.z}`);
//         if (blockData.includes('MenuTag:1b')) {
//             // Remove the chest
//             event.server.runCommandSilent(`setblock ${block.pos.x} ${block.pos.y} ${block.pos.z} minecraft:air`);
//             event.player.tell("The custom menu chest has been removed.");
//         }
//     }
// });


