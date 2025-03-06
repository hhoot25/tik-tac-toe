

const gameObj = (function (){
    const gameboard = [];
    const player1board = [];
    const player2board = [];
    let count = 0;

    //one will mean player 1 turn and two will mean player 2 turn
    let turn = 1;

    let name1;
    let name2;

    const increase_count = () =>{
        count++;
    }

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
        //check diagnols
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
        
        //increase pieces on board by one
        increase_count();

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
        if(checkGame(board) == true){
            console.log(`${turn} won`);
        }

        //change player turn
        if(turn == 1){
            gameObj.turn = 2;
        }
        else{
            gameObj.turn = 1;
        }

        if(count == 9){
            console.log("it's a tie");
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
            alert("already piece there");
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
    
    return {updateDisplay,clickDisplay};

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



//main

gameObj.name1 = "bob";
gameObj.name2 = "emma";

//bob is X : emma is o
gameObj.move(gameObj.turn,22);

gameObj.move(gameObj.turn,11);

gameObj.move(gameObj.turn,33);

gameObj.move(gameObj.turn,21);



controlDisplay.updateDisplay(gameObj);







