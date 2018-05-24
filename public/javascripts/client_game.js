// =====================
// Create required vars
// =====================
var output = $('.output');
var input = $('textarea.input');

// Set up the library of rooms and items and mobs for a one
// dungeon game.
var rooms = {
    'Hall':{
        'south': 'Kitchen'
    },
    'Kitchen':{
        'north': 'Hall'
    }
};

var currentLocation = 'Hall';
var inventory = [];


//create listener for commands
input.keypress(function(e) {
    if (e.which == 13) {
        var inputVal = $.trim(input.val());
        inputVal = inputVal.split(" ");
        console.log(inputVal[0]);
        //if the first word is get
        if(inputVal[0] == 'get'){
            console.log(inputVal[1]);
        }
        //if the first word in the command is go
        if(inputVal[0] == 'go'){
            console.log(inputVal[1]);
            if(inputVal[1] in rooms[currentLocation]){
                currentLocation = rooms[currentLocation][inputVal[1]];
            }else{
                console.log("You cannot go that way");
            }
        }
        input.val('');
    }
});

// functions related to the commands typed

// prints out a seperator
function seperator() {
    Output('<span class="seperator">== == == == == == == == == == == == == == == == == ==</span></br>');
}

//clears the screen
function clearConsole() {
    output.html("");
    Output('<span>clear</span></br>');
}

// Prints out the result of the command into the output div
function Output(data) {
    $(data).appendTo(output);
}