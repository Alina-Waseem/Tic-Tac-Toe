let turn = "X";
let gameOver = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

const updateTurnIndicator = () => {
    const xBox = document.querySelectorAll('.turn-box')[0];
    const oBox = document.querySelectorAll('.turn-box')[1];
    
    if (turn === "X") {
        xBox.classList.add('active-x');
        oBox.classList.remove('active-o');
    } else {
        oBox.classList.add('active-o');
        xBox.classList.remove('active-x');
    }
}

const checkWin = () => {
    let boxTexts = document.getElementsByClassName('boxText');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let e of wins) {
        if ((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && 
            (boxTexts[e[2]].innerText === boxTexts[e[1]].innerText) && 
            (boxTexts[e[0]].innerText !== "")) {
                
            // Display the winning message
            document.querySelector('.won-msg').innerText = boxTexts[e[0]].innerText + ' Won!';
            gameOver = true;
            document.querySelector('.won-msg').classList.add('show');
            // Hide the turn indicator when the game is over
            document.getElementsByClassName("info")[0].innerText = "";
            return; // Exit the function if a winner is found
        }
    }

    // Check for draw
    let isDraw = true;
    Array.from(boxTexts).forEach(box => {
        if (box.innerText === '') {
            isDraw = false; // At least one box is still empty
        }
    });
    
    if (isDraw) {
        document.querySelector('.won-msg').innerText = 'Draw!';
        document.querySelector('.won-msg').classList.add('show');
        gameOver = true;
        document.getElementsByClassName("info")[0].innerText = "";
    }
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxText');
    element.addEventListener('click', () => {
        if (boxText.innerText === '' && !gameOver) {
            boxText.innerText = turn;
            turn = changeTurn();
            updateTurnIndicator(); // Update the turn indicator
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxText');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = 'X';
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0px";

    // Clear the winning message
    document.querySelector('.won-msg').innerText = "";
    document.querySelector('.won-msg').classList.remove('show');

    updateTurnIndicator(); // Reset turn indicator
});
