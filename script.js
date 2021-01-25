// ------------------------------------------ createPlayer: creates play profiles
const createPlayer = (name, sign) => {
    return {name, sign};
};


// ------------------------------------------ gameBoard: tracks where each player's pieces are
const gameBoard = (() => {
    let board = new Array(9) 
    for (let i = 0; i < board.length; i++) { // Initial board setup
        board[i] = "";
    }

    let sign = "x"; // Setting initial sign

    const getSpace = (space) => { // Called by gameController after a space is picked by player, determines if a piece is already in space
        let index;
        if (space === "zero") index = 0; // Convert id of space picked to its index in board array
        else if (space === "one") index = 1;
        else if (space === "two") index = 2;
        else if (space === "three") index = 3;
        else if (space === "four") index = 4;
        else if (space === "five") index = 5;
        else if (space === "six") index = 6;
        else if (space === "seven") index = 7;
        else if (space === "eight") index = 8;
        
        if (board[index] === "") return index; // If no piece is on space checked, space checked (index) is returned
        else return false // If piece is on space already, false is returned

    }

    const setSpace = (index) => {
        board[index] = sign;
        if (sign === "x") sign = "o";
        else if (sign === "o") sign = "x";
        console.log(board);

    }

/*     const getSpace = (space) => { //
        
        if (sign === "&times;") sign = "o";
        else if (sign === "o") sign = "&times;";

        const draw = document.querySelector(`.draw-${space}`); // TEST TO DRAW ON BOARD
        draw.innerHTML = sign;
    }; */

    const reset = () => { // Resets board array
        sign = "x"
        for (let i = 0; i < board.length; i++) { // Initial board setup
            board[i] = "";
        }
    };

    return {
        getSpace,
        setSpace,
        reset
    };

})();


// ------------------------------------------ displayController: draws pieces to visual board on each turn
// ------------------------------------------ contains event listeners and prompts

const displayController = (() => { 
    let sign = "&times;"

    const drawSpace = (space)  => {
        if (space === 0) drawHere = "zero";
        else if (space === 1) drawHere = "one"; 
        else if (space === 2) drawHere = "two"; 
        else if (space === 3) drawHere = "three"; 
        else if (space === 4) drawHere = "four"; 
        else if (space === 5) drawHere = "five"; 
        else if (space === 6) drawHere = "six"; 
        else if (space === 7) drawHere = "seven"; 
        else if (space === 8) drawHere = "eight";
        document.querySelector(`.draw-${drawHere}`).innerHTML = sign;
        if (sign === "&times;") sign = "o";
        else if (sign === "o") sign = "&times;";
    };

    const reset = () => { // Clear the visual board for start of new game
        sign = "&times;"
        document.querySelector(".draw-zero").innerHTML = "";
        document.querySelector(".draw-one").innerHTML = "";
        document.querySelector(".draw-two").innerHTML = "";
        document.querySelector(".draw-three").innerHTML = "";
        document.querySelector(".draw-four").innerHTML = "";
        document.querySelector(".draw-five").innerHTML = "";
        document.querySelector(".draw-six").innerHTML = "";
        document.querySelector(".draw-seven").innerHTML = "";
        document.querySelector(".draw-eight").innerHTML = "";
    };

    const spaces = document.querySelectorAll(".space"); // Loop to create event listeners on each space
    for (let i = 0; i < 9; i++) {
        spaces[i].addEventListener("mousedown", (space) => gameController.takeTurn(space.target.id)); // Indicate to gameController module that space has been picked by player. Sends div id as argument
     }
     
    const resetButton = document.querySelector(".reset"); // Create event listener to reset board
    resetButton.addEventListener("mousedown", () => gameController.resetBoard());

    return {
        drawSpace,
        reset
    };
})();

// ------------------------------------------ gameController: controls game flow and logic
const gameController = (() => {

    const playerOne = createPlayer("BobONE", "x");
    const playerTwo = createPlayer("JoeTWO", "o");


    const takeTurn = (space) => { // Runs when a space has been picked, will run function in gameBoard module to determine if spot is taken first, then call displayController if piece needs to be drawn
        let spaceResult = gameBoard.getSpace(space);
        if (spaceResult !== false) { // If no piece was found on space, write piece to board array and visual board
            gameBoard.setSpace(spaceResult);
            displayController.drawSpace(spaceResult);
            
        }
    };

    const resetBoard = () => { // Called from displayController, calls on gameBoard to reset board array and displayController to clear visual board
        gameBoard.reset();
        displayController.reset();
    };


    return {
        takeTurn,
        resetBoard
    };
})();


