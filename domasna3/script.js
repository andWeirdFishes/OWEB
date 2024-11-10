const words = ['BLADE', 'SLOPE', 'ROLES', 'DRIVE', 'EAGLE', 'FLUTE', 'GROSS', 'HOUND', 'LANDS', 'BOARD'];

// Replace these URLs with your actual hangman images
const hangmanStages = [
    './img/img0.png',
    './img/img1.png',
    './img/img2.png',
    './img/img3.png',
    './img/img4.png',
    './img/img5.png'
];

let currentWord = '';
let displayWord = '';
let remainingTries = 5;
let gameOver = false;

function initializeGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    let indices = [];
    while (indices.length < 2) {
        let index = Math.floor(Math.random() * 5);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }

    // Create display word with revealed letters
    displayWord = '_____'.split('');
    indices.forEach(index => {
        displayWord[index] = currentWord[index];
    });

    updateDisplay();
}

function updateDisplay() {
    document.getElementById('word-display').innerHTML = displayWord.join('');
    document.getElementById('hangman-image').style.backgroundImage = `url('${hangmanStages[5 - remainingTries]}')`;
    document.getElementById('triesLeft').innerHTML = remainingTries;
}

function guessLetter() {
    if (gameOver) return;

    const input = document.getElementById('letterInput');
    const letter = input.value.toUpperCase();
    input.value = '';

    if (!letter.match(/[A-Z]/)) {
        showMessage('Please enter a valid letter.');
        return;
    }

    let found = false;
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter && displayWord[i] === '_') {
            displayWord[i] = letter;
            found = true;
        }
    }

    if (!found) {
        remainingTries--;
        if (remainingTries === 0) {
            endGame(false);
        }
    }

    if (displayWord.join('') === currentWord) {
        endGame(true);
    }

    updateDisplay();
}

function endGame(won) {
    gameOver = true;
    if (won) {
        showMessage('Congratulations! You won!');
    } else {
        showMessage(`Game Over! The word was ${currentWord}`);
    }
    document.getElementById('letterInput').disabled = true;
}

function showMessage(msg) {
    document.getElementById('message').innerHTML = msg;
}

function startNewGame() {
    remainingTries = 5;
    gameOver = false;
    document.getElementById('letterInput').disabled = false;
    showMessage('');
    initializeGame();
}

// Event listener for Enter key
document.getElementById('letterInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});

// Start the game when the page loads
window.onload = startNewGame;