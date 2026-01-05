
// Sorthing Algorithm for Divinity
function partdiv(arr, low, high) { 
    let p = arr[high]; 
    let i = low - 1; 
  
    for (let j = low; j <= high - 1; j++) { 
        // If current element is smaller than the pivot 
        if (arr[j].offering > p.offering) { 
            // Increment index of smaller element 
            i++; 
            // Swap elements 
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        } 
    } 
    // Swap pivot to its correct position 
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1; // Return the partition index 
} 
  
function quickSortdiv(arr, low, high) { 

    if (low >= high) return; 
    let pi = partdiv(arr, low, high); 
  
    quickSortdiv(arr, low, pi - 1); 
    quickSortdiv(arr, pi + 1, high); 
} 
// Divinity
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('hasDivinity')
            .executes(ctx => {
                if (ctx.source.player.persistentData.divinity !== ""){
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set hasdivinity false true`)
                }
                else {
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set hasdivinity false false`)
                }
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
// Choose God
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('chooseDivinity')
        .then(Commands.argument('divinity', Arguments.STRING.create(event))
            .executes(ctx => {
                const first = Arguments.STRING.getResult(ctx,'divinity')
                ctx.source.player.persistentData.divinity = first
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    );
});

// Forsake God
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('leaveDivinity')
            .executes(ctx => {
                ctx.source.player.persistentData.divinity = ""
                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// Increase Divinity
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('increaseDivinity')
        .then(Commands.argument('val', Arguments.STRING.create(event))
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                const first = Arguments.STRING.getResult(ctx,'val')
                const index = Utils.server.persistentData.divinity.findIndex((divinity) => divinity.god === ctx.source.player.persistentData.divinity)
                Utils.server.persistentData.divinity[index].offering += parseInt(first)
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    )
    );
});
// 1st Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('divinity1')
            .executes(ctx => {
                if(Utils.server.persistentData.divinity.length > 0){
                    const f = Utils.server.persistentData.divinity[0]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinity1 false ${f.god}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinity1 false None`)
                }




                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// 2nd Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('divinity2')
            .executes(ctx => {
                if(Utils.server.persistentData.divinity.length > 1){
                    const f = Utils.server.persistentData.divinity[1]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinity2 false ${f.god}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinity2 false None`)
                }




                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});

// 3rd Place
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('divinity3')
            .executes(ctx => {
                if(Utils.server.persistentData.divinity.length > 2){
                    const f = Utils.server.persistentData.divinity[2]
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinity3 false ${f.god}`)
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinity3 false None`)
                }




                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
// Sorted List
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('divinityAll')
            .executes(ctx => {
                let s = ""
                let counter = 0
                if(Utils.server.persistentData.divinity.length > 0){
                    Utils.server.persistentData.divinity.forEach(f => {
                        counter++
                        s += counter + ". " + f.god +"\n" 
                    })
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinityall false ${s}`)
    
                }
                else{
                    Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinityall false None`)
                }


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});


ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('populateDivinityLeaderboard')
            .executes(ctx => {
                ctx.source.player.runCommandSilent('divinity1')
                ctx.source.player.runCommandSilent('divinity2')
                ctx.source.player.runCommandSilent('divinity3')
                ctx.source.player.runCommandSilent('divinityAll')


                return 1; // Returning a value is required; 1 indicates success.
            })
    );
});
ServerEvents.loaded(event => {
    if (Utils.server.persistentData.divinity){
        quickSortdiv(Utils.server.persistentData.divinity,0,Utils.server.persistentData.divinity.length - 1)
    }
})

// Find Rank
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('divinityRank')
            .executes(ctx => {
                console.log("Player divinity:", ctx.source.player.persistentData.divinity);
                const rank = Utils.server.persistentData.divinity.findIndex((divinity) => divinity.god === ctx.source.player.persistentData.divinity) + 1
                Utils.server.runCommandSilent(`execute as ${ctx.source.player.username} run fmvariable set divinityrank false ${rank}`)

                return 1; // Returning a value is required; 1 indicates success.
            })
        );
});

// Get Potion Effect
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('divinityPotionEffect')
        .then(Commands.argument('val', Arguments.STRING.create(event))
        .then(Commands.argument('authentication', Arguments.STRING.create(event))
        .executes(ctx => {
            const auth = Arguments.STRING.getResult(ctx,'authentication')
            if (auth !== '0mfiqzo1aays3c0'){
                Utils.server.tell(`You are not authenticated to use this command.`)
                return 1;
            }
                const first = Arguments.STRING.getResult(ctx,'val')
                const index = Utils.server.persistentData.divinity.findIndex((divinity) => divinity.god === ctx.source.player.persistentData.divinity)
                Utils.server.persistentData.divinity[index].offering += parseInt(first)
                return 1; // Returning a value is required; 1 indicates success.
            })
        )
    )
    );
});
