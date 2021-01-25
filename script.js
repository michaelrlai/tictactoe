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

    let sign = "&times;"; // Setting initial sign

    const getCurrentSpace = (space) => { //
    
        console.log(space + "3");
        console.log(sign);
        

        if (sign === "&times;") sign = "o";
        else if (sign === "o") sign = "&times;";

        const draw = document.querySelector(`.draw-${space}`); // TEST TO DRAW ON BOARD
        draw.innerHTML = sign;
    };


    return {
        getCurrentSpace
    };

})();


// ------------------------------------------ displayController: draws pieces to visual board on each turn
// ------------------------------------------ contains event listeners and prompts

const displayController = (() => { // Convert space clicked to ID that corresponds to space
    function getSpaceId() {
        console.log(this.id);
        gameController.pickSpace(this.id); // Tells gameController module that a space as been picked
    }

    const spaces = document.querySelectorAll(".space"); // Loop to create event listeners on each space
    for (let i = 0; i < 9; i++) {
        spaces[i].addEventListener("mousedown", getSpaceId);
     }
     
    return {
    
    };
})();

// ------------------------------------------ gameController: controls game flow and logic
const gameController = (() => {

    const playerOne = createPlayer("BobONE", "x");
    const playerTwo = createPlayer("JoeTWO", "o");

    const pickSpace = (space) => { // Runs when a space has been picked, will run function in gameBoard module to determine if spot is taken first
        console.log(space + '2');
        gameBoard.getCurrentSpace(space);
    };


    return {
        pickSpace,
    };
})();


