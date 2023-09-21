/* assignment description
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

//references to HTML
let xButton        = document.getElementById("x");
let oButton        = document.getElementById("o");
let playerSymbol   = document.getElementById("playerSymbol");
let computerSymbol = document.getElementById("computerSymbol");
let playP          = document.getElementById("playP");
let compP          = document.getElementById("compP");
let grid           = document.getElementById("grid");
let gridd          = document.getElementById("gridd");
let tiles          = gridd.children; //nodelist [0] thru [8].

//game board object module.
let GameBoard = (function() {

    let tileArray = [];
    let xArray = [];
    let oArray = [];
    let winStates = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6'],
    ];
    let round = 0;

    const alterTileArray = function(e){
    	let target = e.target.id;
        if(tileArray.length < 9){ tileArray.push(target); };
        console.log(tileArray); 
    };

    const increment = function(){
        if(round < 9){
        round++;
        console.log(round);
        }
    };

    return {
        tileArray,
        alterTileArray,
        round,
        increment, 
    }

})();

//player object factory.
let playerFactory = function(name, symbol){
    let player = { name: name, symbol: symbol, };
    return player; 
};

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
        tiles[4].children[0].innerHTML = "X"; 
        tiles[4].removeEventListener("click", tilePress); //flagged as error in browser.
        GameBoard.increment();
    }

};

//transfers player symbol to tile clicked.
let tilePress = function(){    
    let tile = this.id;
    tiles[tile].children[0].innerHTML = playP.innerHTML;
};

//function that governs computer player turn.
let skyNet = function(){

if (GameBoard.round = 2){
    if(playP = "x"){}
    else{}
}
else if (GameBoard.round = 3){
    if(playP = "x"){}
    else{}
}
else if (GameBoard.round = 4){
    if(playP = "x"){}
    else{}
}
else if (GameBoard.round = 5){
    if(playP = "x"){}
    else{}
}
};

//removes tilePress from pressed tile when pressed.
let remover = function(){
    let tile = this.id;
    tiles[tile].removeEventListener("click", tilePress);
};

//initial event listeners
xButton.addEventListener("click", xoChoice);
oButton.addEventListener("click", xoChoice);

for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", tilePress);
    tiles[i].addEventListener("click", remover);
    tiles[i].addEventListener("click", GameBoard.increment);
    tiles[i].addEventListener("click", GameBoard.alterTileArray);
}

  /* USE THIS AS A BASIS TO MAKE WIN CHECKING/ PER-ROUND CHECK-IF-WIN STUFF.
let x = [
  ['0', '1', '2'],
  ['3', '4', '7'],
  ['0', '2', '3'],
];

let y = ['0', '2', '5', '3', '4', ];

//if array y contains all 3 of any of the numbers in the arrays in the x array, trigger win.
let answerArray = [];

for (let f = 0; f < x.length; f++) {
  for (let i = 0; i < y.length; i++) {
    let answer1 = x[f][0] === y[i] ? true : false;
    answerArray.push(answer1);
    let answer2 = x[f][1] === y[i] ? true : false;
    answerArray.push(answer2);
    let answer3 = x[f][2] === y[i] ? true : false;
    answerArray.push(answer3);
  }

  let result = answerArray.filter((item) => item === true);

  console.log(answerArray);
  console.log(result);

  if (result.length >= 3) {
    console.log("win!"); //replace with win condition
  } else {
    answerArray = [];
    result = [];
  }
}

  */
