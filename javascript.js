/*
You’re going to store the gameboard as an array inside of a Gameboard object, so start there! 
Your players are also going to be stored in objects, 
and you’re probably going to want an object to control the flow of the game itself.

if you only ever need ONE of something (gameBoard), 
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

//create game board object module.
let GameBoard = (function() {
    let tileArray = Array(9);
    return {
      tileArray: tileArray,
    }
})();

//create player object factory.
let playerFactory = function(name, symbol){
    let player = { name: name, symbol: symbol, };
    return player; 
};

//references to HTML
let xButton = document.getElementById("x");
let oButton = document.getElementById("o");

let playerSymbol = document.getElementById("playerSymbol");
let computerSymbol = document.getElementById("computerSymbol");

let playP = document.getElementById("playP");
let compP = document.getElementById("compP");

let grid = document.getElementById("grid");
let gridd = document.getElementById("gridd");
let tiles = gridd.children; //nodelist [0] thru [8].

//button functions
let xoChoice = function() {

    let val = this.value;
    playerSymbol.classList += " pRevealed";
    computerSymbol.classList += " pRevealed";
    oButton.style.display = "none";
    xButton.style.display = "none";
    gridd.style.display = "grid";
    playP.classList += " pRevealed";
    compP.classList += " pRevealed";

    if (val == "X") {
        playP.innerHTML = "X";
        compP.innerHTML = "O";
    }
    else {
        playP.innerHTML = "O";
        compP.innerHTML = "X";
    }

}

xButton.addEventListener("click", xoChoice);
oButton.addEventListener("click", xoChoice);

//this is what runs when the tiles are pressed. not complete.
let tilePress = function(){
    let tile = this.id;
    tiles[tile].children[0].innerHTML = playP.innerHTML;
    //updates the board array.
    for (let i = 0; i < gridd.length; i++) {
        GameBoard.tileArray[i] = tiles[i].innerHTML;
    }
};
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", tilePress);
}


  /* Notes ############################################################################################


  
    EXAMPLE OF MODULE 

            const Game = (() => {

                let count = 0;
            
                const current = () => { return `Game score is ${count}.` };
                const increment = () => { count++ };
                const reset = () => { count = 0 };
            
                        return {
                            current: current,
                            increment: increment,
                            reset: reset,
                        }
            
            })();
            
            Game.increment();
            console.log(Game.current());

  */