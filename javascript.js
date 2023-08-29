/*
You’re going to store the gameboard as an array inside of a Gameboard object, so start there! 
Your players are also going to be stored in objects, 
and you’re probably going to want an object to control the flow of the game itself.

if you only ever need ONE of something (gameBoard, displayController), 
use a module. If you need multiples of something (players!), create them with factories.

write a JavaScript function that will render the contents of the gameboard array to the webpage 
(for now you can just manually fill in the array with "X"s and "O"s)

Build the functions that allow players to add marks to a specific spot on the board, 
and then tie it to the DOM, letting players click on the gameboard to place their marker. 
Don’t forget the logic that keeps players from playing in spots that are already taken!

Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

Clean up the interface to allow players to put in their names, include a button to start/restart 
the game and add a display element that congratulates the winning player!

create an AI so that a player can play against the computer!
*/

//generate game board module. 
const newGame = (function() {

    'use strict';
    
    let gameBoard = {
        board : [],
    }

    return { gameBoard }

})();	

//create player object factory.
function playmaker(nameEntry, symbol){
    return{
        nameEntry: nameEntry,
        symbol: symbol,
    }
}



/*
make button click show form.
form has two inputs, name and symbol.
when submitted, these populate the pplayer object and launch the game board.
clicking a box updates the corresponding gameboard array item which updates the board.
The ai then decides where to put it's symbol.
when 3 in a row, round winner is announced.
*/