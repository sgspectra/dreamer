// =====================
// Create required vars
// =====================
var output = $('.output');
var input = $('textarea.input');
var inventory = [];

// Set up the library of rooms and items and mobs for a one
// dungeon game.
var rooms = {
    'hall1':{
        'north': 'kitchen',
        'east': 'hall2',
        'south': 'hall3',
        'west': 'hall4',
        'desc': 'From this hall you see the kitchen to the north. The hall continues in all other directions.'
    },
    'hall2':{
        'east': 'stairs1',
        'west': 'hall1',
        'desc': 'To the east, you see what looks like a stairway.'
    },
    'hall3':{
        'north': 'hall1',
        'south': 'foyer',
        'desc': 'To the south you see what looks like the entryway.'
    },
    'hall4':{
        'north': 'laundry',
        'east': 'hall1',
        'west': 'study'
    },
    'hall5':{
        'east': 'stairs2',
        'west': 'hall6',
        'desc': 'The hallway continues to the west, but you see a staircase to the east.'
    },
    'hall6':{
        'north': 'bedroom1',
        'east': 'hall5',
        'south': 'bedroom2',
        'west': 'hall7',
        'desc': 'This appears to be a hallway, but you swear you lived in a studio apartment. The hallway ' +
        'continues to the east and west. There is a door to a second bedroom to the south.',
        'mob': 'bat'
    },
    'hall7':{
        'north': 'bathroom',
        'east': 'hall6',
        'west': 'master',
        'desc': 'This hallway continues to the west where you see the master bedroom. To your north, ' +
        'you see a bathroom.'
    },
    'kitchen':{
        'south': 'hall1',
        'west': 'laundry',
        'desc': 'It seems like this kitchen was used not too long ago. You see a laundry room to the west.'
    },
    'laundry':{
        'east': 'kitchen',
        'south': 'hall4',
        'item': 'tide pod',
        'desc': 'Hmmm tasty tide pods...'
    },
    'study':{
        'east': 'hall4',
        'south': 'office',
        'item': 'frontdoorkey',
        'desc': 'This room smells of rich mahogany. To the south you see a door.'
    },
    'office':{
        'north': 'study',
        'desc': 'This must be an office. There are papers strewn about the desk and the safe is ajar.'
    },
    'foyer':{
        'north': 'hall3',
        'south': 'exit',
        'desc': 'You see a coat rack. There is an umbrella in a stand. Oh and is that the exit?'
    },
    'stairs1':{
        'west': 'hall2',
        'staircase': 'stairs2',
        'desc': 'A staircase goes up.'
    },
    'stairs2':{
        'west': 'hall5',
        'staircase': 'stairs1',
        'desc': 'A staircase goes down.'
    },
    'bedroom1':{
        'south': 'hall6',
        'west': 'bathroom',
        'desc': 'This is the room you woke up in, it looks like there is a bathroom to the west. To the south ' +
        'you see a door to a hallway'
    },
    'bedroom2':{
        'north': 'hall6',
        'south': 'balcony1',
        'desc': 'Another bedroom, is this your place? You don\'t remember the balcony to the south.'
    },
    'bathroom':{
        'east': 'bedroom1',
        'south': 'hall7',
        'desc': 'This bathroom smells of bleach. The tub is suspiciously clean.'
    },
    'master':{
        'east': 'hall7',
        'south': 'ensuite',
        'west': 'balcony2',
        'item': 'studykey',
        'desc': 'This is the master bedroom. You see a key on the nightstand near the bed. To the south you see the ' +
        'master bath. To the west, a balcony with a view.'
    },
    'ensuite':{
        'north': 'master',
        'desc': 'You notice a damp towel on the floor.'
    },
    'balcony1':{
        'north': 'bedroom2',
        'desc': 'From this balcony you can see the front yard. The lawn could use mowing.'
    },
    'balcony2':{
        'east': 'master',
        'desc': 'The view to the west is of an ominous mountain range.'
    }
};

//set up library of baddies
var baddies = {
    'bat':{
        'health': 1,
        'attack': 1,
        'accuracy': .1
    }
};

//information about the player
var player = {
    'health': 3
};

seperator();
Output('<p>You awake in the bed you fell asleep in, but something ' +
    'seems different. Groggily, you get out of bed...</p>');
healthStatus();
var currentLocation = 'bedroom1';

//create listener for commands
input.keypress(function(e) {
    if (e.which == 13) {
        var inputVal = $.trim(input.val());
        inputVal = inputVal.split(" ");
        console.log(inputVal[0]);
        //if the first word is get
        if(inputVal[0] == 'get'){
            console.log(inputVal[1]);
            if(('item' in rooms[currentLocation])&&(inputVal[1] == rooms[currentLocation]['item'])){
                inventory.push(inputVal[1]);
                delete rooms[currentLocation]['item'];
            }else{
                Output('<p>Item does not exist!</p>');
                console.log('Item does not exist');
            }
        }
        //if the first word in the command is go
        if(inputVal[0] == 'go'){
            console.log(inputVal[1]);
            if(inputVal[1] in rooms[currentLocation]){
                currentLocation = rooms[currentLocation][inputVal[1]];
            }else{
                Output('<p>You cannot go that way!</p>');
                console.log("You cannot go that way");
            }
        }
        if('mob' in rooms[currentLocation]){
            encounter();
        }
        input.val('');
        locationStatus();
        seperator();
    }
});

// functions related to the commands typed

// prints out a seperator
function seperator(){
    Output('<span class="seperator">== == == == == == == == == == == == == == == == == ==</span></br>');
}

//clears the screen
function clearConsole(){
    output.html("");
    Output('<span>clear</span></br>');
}

// Prints out the result of the command into the output div
function Output(data){
    $(data).appendTo(output);
}

//print info about where you are
function locationStatus(){
    Output('<p>You are in ' + currentLocation + '.</p>');
    Output('<p>'+rooms[currentLocation]['desc']+'</p>');
    if('item' in rooms[currentLocation]){
        Output('<p>You see a ' + rooms[currentLocation]['item'] + '.</p>');
    }
}

//print health info
function healthStatus(){
    Output('<p>HP: ' + player.health + '</p>');

}

//define a function fo an encounter
function encounter(){
    var enemy = rooms[currentLocation]['mob'];
    Output('<p>You have encountered a '+ enemy + '!</p>');
    var enemyHealth = baddies[enemy]['health'];
    var enemyAttack = baddies[enemy]['attack'];
    if(Math.random() < baddies[enemy]['accuracy']){
        player['health'] = player['health'] - enemyAttack;
        Output('<p>You have been hit for ' + enemyAttack +' damage.</p>');
        healthStatus();
    }else{
        Output('<p>The ' + enemy + ' attacked but it missed!</p>');
    }
}