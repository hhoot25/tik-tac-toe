const display = document.querySelector("#display");

const confirmBtn = document.querySelector('#confirmBtn');
const myForm = document.querySelector('#myForm');

const goForm = document.querySelector('#goForm');

const dialog = document.querySelector('#dialog');

const restart = document.querySelector('#restart');

const gameObj = (function (){
    const gameboard = [];
    const player1board = [];
    const player2board = [];

    //one will mean player 1 turn and two will mean player 2 turn
    let turn = 1;

    let name1;
    let name2;



    //check if game is won
    const checkGame = (board) => {
        //check rows
        if(board.includes(11) && board.includes(12) && board.includes(13)){
            return true;
        }
        if(board.includes(21) && board.includes(22) && board.includes(23)){
            return true;
        }
        if(board.includes(31) && board.includes(32) && board.includes(33)){
            return true;
        }
        //check columns
        if(board.includes(11) && board.includes(21) && board.includes(31)){
            return true;
        }
        if(board.includes(12) && board.includes(22) && board.includes(32)){
            return true;
        }
        if(board.includes(13) && board.includes(23) && board.includes(33)){
            return true;
        }
        //check diagonals
        if(board.includes(11) && board.includes(22) && board.includes(33)){
            return true;
        }
        if(board.includes(13) && board.includes(22) && board.includes(31)){
            return true;
        }
        return false;
    }
    
    const move = (turn,num) => {
        if(gameboard.includes(num)){
            console.log(`board already has ${num}`);
            return false;
        }
        

        let board;
        gameboard.push(num);
        if(turn == 1){
            player1board.push(num);
            board = player1board;
        }
        else{
            player2board.push(num);
            board = player2board;
        }
        console.log(`${turn} claimed ${num}`);
        

        //change player turn
        if(turn == 1){
            gameObj.turn = 2;
            display.textContent = `${gameObj.name2} Turn`;
        }
        else{
            gameObj.turn = 1;
            display.textContent = `${gameObj.name1} Turn`;
        }
        //check game logic after move
        if(checkGame(board) == true){
            let name;
            if(turn == 1){
                name = gameObj.name1;
            }
            else {name = gameObj.name2}
            display.textContent = `${name} Won!`;
            return;
        }

        if(gameObj.gameboard.length == 9){
            display.textContent = `It's a tie, Play Again!`;
        }
    }






    return({gameboard,name1,name2,player1board,player2board,checkGame,move, turn});

})();


//controlDisply object
const controlDisplay = (function(){

    const updateDisplay = (gameboard)=> {
        gameObj.player1board.forEach(function(item){
            let square = document.querySelector(`#_${item}`)
            square.textContent = "x";
            
        });

        gameObj.player2board.forEach(function(item){
            let square = document.querySelector(`#_${item}`)
            square.textContent = "o";
            
        });
    }

    const clickDisplay = (turn,num) =>{
        if(gameObj.move(turn,num) == false){
            display.innerHTML = ("already piece there");
            return;
        }
        let mark;
        if(turn == 1){
            mark = "x";
        }
        else{
            mark = "o";
        }
        let square = document.querySelector(`#_${num}`)
            square.textContent = mark;
    }

    const restartDisplay = () => {
        gameObj.gameboard.length = 0;
        gameObj.player1board.length = 0;
        gameObj.player2board.length = 0;
        gameObj.turn = 1; // Reset turn to player 1

        elements.forEach(element => {
            element.textContent = ""; // Clear board display
        });

        display.textContent = `${gameObj.name1} goes first!`; // Reset display
    }

    
    return {updateDisplay,clickDisplay,restartDisplay};

})();

//add event listener to add squares
const elements = document.querySelectorAll('.square');

elements.forEach(element => {
    element.addEventListener('click', function(event){
        let string = `${this.id}`;
        let sliceString = string.slice(1);
        let num = parseInt(sliceString);
        controlDisplay.clickDisplay(gameObj.turn, num);
    });
});

goForm.addEventListener("click", () =>{
    dialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(myForm);
    const name1 = formData.get("name1");
    const name2 = formData.get("name2");

    gameObj.name1 = name1;
    gameObj.name2 = name2;

    controlDisplay.restartDisplay();



    dialog.close();

});

restart.addEventListener("click", ()=>{
    controlDisplay.restartDisplay();
});



//main

gameObj.name1 = "default1";
gameObj.name2 = "default1";
//bob is X : emma is o


controlDisplay.updateDisplay(gameObj);
dialog.showModal();







