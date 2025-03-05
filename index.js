

function createGameboard (player1,player2){
    const gameboard = [];
    const player1board = [];
    const player2board = [];
    let count = 0;

    const name1 = player1.name;
    const name2 = player2.name;

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
    
    const move = (name,num) => {
        if(gameboard.includes(num)){
            console.log(`board already has ${num}`);
            return false;
        }
        increase_count();


        gameboard.push(num);
        let board;
        if(name === name1){
            player1board.push(num);
            board = player1board;
        }
        else{
            player2board.push(num);
            board = player2board;
        }
        console.log(`${name} claimed ${num}`);
        if(checkGame(board) == true){
            console.log(`${name} won`);
        }

        if(count == 9){
            console.log("it's a tie");
        }
    }






    return({gameboard,name1,name2,player1board,player2board,checkGame,checkGame,move});

}

function createPlayer(playerName){
    let name = playerName;
    return({name});
}

//controlDisply object
const controlDisplay = (function(){

    const updateDisplay = (gameboard)=> {
        gameboard.player1board.forEach(function(item){
            let square = document.querySelector(`#_${item}`)
            square.textContent = "x";
            
        });

        gameboard.player2board.forEach(function(item){
            let square = document.querySelector(`#_${item}`)
            square.textContent = "o";
            
        });
    }

    const clickDisplay = (gameboard,name,num) =>{
        if(gameboard.move(name,num) == false){
            alert("already piece there");
            return;
        }
        let mark;
        if(name == gameboard.name1){
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



//main
bob = createPlayer("bob");
emma = createPlayer("emma");

game1 = createGameboard(bob, emma);
game1.move("bob",22);
game1.move("bob", 11);
game1.move("bob", 33);
game1.move("emma",21);



controlDisplay.updateDisplay(game1);

controlDisplay.clickDisplay(game1, "bob", 13);

let square = document.querySelector(`#_${23}`)
square.addEventListener("click", () => controlDisplay.clickDisplay(game1, "emma", 23));





