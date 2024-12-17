// Set up global variables
let btnNewGame = document.querySelector('#newGame'),
    btnEasyGame = document.querySelector('#easyGame'),
    btnHardGame = document.querySelector('#hardGame'),
    rgbColor = document.querySelector('#rgbColor'),
    blocks = document.querySelectorAll('.block'),
    divs = document.querySelectorAll('.second-block'),
    allDivs = [...blocks, ...divs],
    congText = document.querySelector('.congText'),
    counterText = document.querySelector('.counterText'),
    isEasyModo = false,
    counter = 0;

// Generate a random integer between min and max
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random RGB color and return as a string
function randomNumber() {
    const color1 = randomInteger(0, 255);
    const color2 = randomInteger(0, 255);
    const color3 = randomInteger(0, 255);
    return `${color1}, ${color2}, ${color3}`;
}

// Set colors for divs based on game mode
function setColor() {
    const targetDivs = isEasyModo ? blocks : allDivs;
    targetDivs.forEach(div => {
        div.style.backgroundColor = `rgb(${randomNumber()})`;
    });
    setTargetColor();
}

// Insert target color into header
function setTargetColor() {
    const targetDivs = isEasyModo ? blocks : allDivs;
    const targetColor = targetDivs[randomInteger(0, targetDivs.length - 1)].style.backgroundColor;
    rgbColor.textContent = targetColor;
}

// Remove congratulation text
function removeText() {
    counterText.innerHTML = '';
    congText.style.color = 'transparent';
}

// Handle easy mode: Hide extra blocks
function easyModo() {
    if (!isEasyModo) {
        divs.forEach(div => div.style.display = 'none');
        isEasyModo = true;
        setColor();
    }
}

// Handle hard mode: Show all blocks
function hardModo() {
    if (isEasyModo) {
        divs.forEach(div => div.style.display = 'block');
        isEasyModo = false;
        setColor();
    }
}

// Handle user clicks on divs to check color match
document.addEventListener('click', event => {
    if (event.target.tagName === 'DIV') {
        const clickedColor = event.target.style.backgroundColor;
        const targetColor = rgbColor.textContent.toLowerCase();
        counter++;

        if (clickedColor === targetColor) {
            allDivs.forEach(div => {
                div.style.backgroundColor = targetColor;
            });
            congText.style.color = 'red';
            counterText.innerHTML = counter <= 3
                ? `Good job! You only made ${counter} attempts.`
                : `You guessed it in ${counter} attempts.`;
            counter = 0; // Reset counter after success
        } else {
            event.target.style.backgroundColor = 'transparent'; // Hide incorrect guess
        }
    }
});

// Set up buttons for game modes and new game
btnEasyGame.addEventListener('click', easyModo);
btnHardGame.addEventListener('click', hardModo);
btnNewGame.addEventListener('click', () => {
    counter = 0; // Reset counter on new game
    setColor();
    removeText();
});

// Initialize the game
setColor();
