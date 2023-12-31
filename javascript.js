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

    let tileArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8',];
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
        const index = tileArray.indexOf(target);
        if (index > -1) { 
            tileArray.splice(index, 1); 
        }
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
        winStates,
        xArray,
        oArray, 
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
        GameBoard.oArray.push("4");
        GameBoard.tileArray.splice(4, 1);
        console.log(GameBoard.xArray);
        console.log(GameBoard.oArray);
        console.log(GameBoard.tileArray);
    }

};

//transfers player symbol to tile clicked.
let tilePress = function(){    
    let tile = this.id;
    tiles[tile].children[0].innerHTML = playP.innerHTML;

    if (playP.innerHTML === "X"){
        GameBoard.xArray.push(tile);
    }
    if (playP.innerHTML === "O"){
        GameBoard.oArray.push(tile);
    }
    winStateChecker(GameBoard.winStates, GameBoard.xArray);
    winStateChecker(GameBoard.winStates, GameBoard.oArray);
};


//function that governs computer player turn.
let computerMove = function(){
    if (GameBoard.tileArray.length >= 1){
    let random = function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

    let randoon = random(0, GameBoard.tileArray.length);
    console.log(randoon); //random index number

    let tile = document.getElementById(GameBoard.tileArray[randoon].toString());
    console.log(tile);

    const index = GameBoard.tileArray.indexOf(GameBoard.tileArray[randoon].toString());
        if (index > -1) { 
            GameBoard.tileArray.splice(index, 1); 
        }
        console.log(GameBoard.tileArray); 

    tile.children[0].innerHTML = compP.innerHTML;

    //pushes chosen tile id to x/o array.
    if (compP.innerHTML === "X"){
        GameBoard.xArray.push(tile.id);
    }
    if (compP.innerHTML === "O"){
        GameBoard.oArray.push(tile.id);
    }
}
    console.log(GameBoard.xArray);
    console.log(GameBoard.oArray);
};
//gets random number between 0 and one less than what's passed to it. ex: 3 could be 0, 1, or 2.
let random = function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//removes tilePress from pressed tile when pressed.
let remover = function(){
    let tile = this.id;
    tiles[tile].removeEventListener("click", tilePress);
};

let winStateChecker = function(a,b){  
    
    let win = 0;
    let answerArray = [];
    let winningSymbol = "";

    for (let f = 0; f < a.length; f++) {
    
      for (let i = 0; i < b.length; i++) {
        let answer1 = a[f][0] === b[i] ? true : false;
        answerArray.push(answer1);
        let answer2 = a[f][1] === b[i] ? true : false;
        answerArray.push(answer2);
        let answer3 = a[f][2] === b[i] ? true : false;
        answerArray.push(answer3);
      }
    
      let result = answerArray.filter((item) => item === true);
    
      console.log(answerArray);
      console.log(result);
    
      if (result.length >= 3) {
          win++;
        alert("Somebody Won!");
        location.reload();
      } else {
        answerArray = [];
        result = [];
      }
      if (win === 1){
      break;
      }
    }
    };

//initial event listeners
xButton.addEventListener("click", xoChoice);
oButton.addEventListener("click", xoChoice);

for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", tilePress); //transfers symbol from button to playP.
    tiles[i].addEventListener("click", remover); //removes tilePress.
    tiles[i].addEventListener("click", GameBoard.increment); //iterates round for no reason.
    tiles[i].addEventListener("click", GameBoard.alterTileArray); //generates psychic field to damage ghosts.
    tiles[i].addEventListener("click", computerMove); //moves for the computer.
}

  /* USE THIS AS A BASIS TO MAKE WIN CHECKING/ PER-ROUND CHECK-IF-WIN STUFF.

let winStateChecker = function(a,b){  
let a = GameBoard.winStates;
//let b = xArray or oArray depending on which function is running;
let win = 0;
let answerArray = [];

for (let f = 0; f < a.length; f++) {

  for (let i = 0; i < b.length; i++) {
    let answer1 = a[f][0] === b[i] ? true : false;
    answerArray.push(answer1);
    let answer2 = a[f][1] === b[i] ? true : false;
    answerArray.push(answer2);
    let answer3 = a[f][2] === b[i] ? true : false;
    answerArray.push(answer3);
  }

  let result = answerArray.filter((item) => item === true);

  console.log(answerArray);
  console.log(result);

  if (result.length >= 3) {
  	win++;
    alert("Win!");
  } else {
    answerArray = [];
    result = [];
  }
  if (win === 1){
  break;
  }
}
};
  */
