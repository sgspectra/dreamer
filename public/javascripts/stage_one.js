// Set up the library of rooms and items and mobs for a one
// dungeon game.
var rooms = {
    'hall1':{
        'north': 'kitchen',
        'east': 'hall2',
        'south': 'hall3',
        'west': 'hall4'
    },
    'hall2':{
        'east': 'stairs1',
        'west': 'hall1'
    },
    'hall3':{
        'north': 'hall1',
        'south': 'foyer'
    },
    'hall4':{
        'north': 'laundry',
        'east': 'hall1',
        'west': 'study'
    },
    'hall5':{
        'east': 'stairs2',
        'west': 'hall6'
    },
    'hall6':{
        'north': 'bedroom1',
        'east': 'hall5',
        'south': 'bedroom2',
        'west': 'hall7'
    },
    'hall7':{
        'north': 'bathroom',
        'east': 'hall6',
        'west': 'master'
    },
    'kitchen':{
        'south': 'hall1',
        'west': 'laundry'
    },
    'laundry':{
        'east': 'kitchen',
        'south': 'hall4'
    },
    'study':{
        'east': 'hall4',
        'south': 'office',
        'item': 'frontdoorkey'
    },
    'office':{
        'north': 'study'
    },
    'foyer':{
        'north': 'hall3'
    },
    'stairs1':{
        'west': 'hall2',
        'staircase': 'stairs2'
    },
    'stairs2':{
        'west': 'hall5',
        'staircase': 'stairs1'
    },
    'bedroom1':{
        'south': 'hall6',
        'west': 'bathroom'
    },
    'bedroom2':{
        'north': 'hall6',
        'south': 'balcony1'
    },
    'bathroom':{
        'east': 'bedroom1',
        'south': 'hall7'
    },
    'master':{
        'east': 'hall7',
        'south': 'ensuite',
        'west': 'balcony2',
        'item': 'studykey'
    },
    'ensuite':{
        'north': 'master'
    },
    'balcony1':{
        'north': 'bedroom2'
    },
    'balcony2':{
        'east': 'master'
    }
};

module.exports = rooms;
