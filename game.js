const wordDisplay = document.getElementById('word-blanks')
const categoryDisplay = document.getElementById('category')
const hangmanImg = document.getElementById('hangman-img')
const keyboardButtons = document.querySelectorAll('.keyboard button')

// win lose div 
const winLoseMenuCloseBtn = document.getElementById('winLoseMenuCloseBtn')
const winLoseDiv = document.getElementById('winLose-div')
const winLoseMessage = document.getElementById('winLoseMessage')

//score
const userScore = document.getElementById('score')

//how to play button
const questionMarkBtn = document.getElementById('questionMark-btn')

// how to play div
const howToPlaydiv = document.getElementById('howToPlay-div') 
const howToPlayCloseBtn = document.getElementById('howToPlayCloseBtn')

// pause menu div
const pauseMenu = document.getElementById('pause-menu')
const playButton = document.querySelector('.pause-button')
const puseMenuCloseBtn = document.getElementById('puseMenuCloseBtn')
const restartBtn = document.getElementById('restart-button')
const homeBtn = document.getElementById('home-button')

const words = [
    // Body Parts
    { word: 'NOSE', category: 'Body Part' },
    { word: 'HAND', category: 'Body Part' },
    { word: 'SMILE', category: 'Emotion' },
    { word: 'LEG', category: 'Body Part' },
    { word: 'HEAD', category: 'Body Part' },
    { word: 'EAR', category: 'Body Part' },
    { word: 'EYE', category: 'Body Part' },
    { word: 'FOOT', category: 'Body Part' },
    { word: 'TEETH', category: 'Body Part' },
    { word: 'FINGER', category: 'Body Part' },
  
    // Emotions
    { word: 'HAPPY', category: 'Emotion' },
    { word: 'SAD', category: 'Emotion' },
    { word: 'ANGER', category: 'Emotion' },
    { word: 'FEAR', category: 'Emotion' },
    { word: 'JOY', category: 'Emotion' },
    { word: 'LOVE', category: 'Emotion' },
    { word: 'PRIDE', category: 'Emotion' },
    { word: 'SHOCK', category: 'Emotion' },
  
    // Fruits
    { word: 'APPLE', category: 'Fruit' },
    { word: 'BANANA', category: 'Fruit' },
    { word: 'ORANGE', category: 'Fruit' },
    { word: 'PEACH', category: 'Fruit' },
    { word: 'CHERRY', category: 'Fruit' },
    { word: 'MANGO', category: 'Fruit' },
    { word: 'PINEAPPLE', category: 'Fruit' },
    { word: 'WATERMELON', category: 'Fruit' },
  
    // Animals
    { word: 'DOG', category: 'Animal' },
    { word: 'CAT', category: 'Animal' },
    { word: 'TIGER', category: 'Animal' },
    { word: 'ELEPHANT', category: 'Animal' },
    { word: 'LION', category: 'Animal' },
    { word: 'GIRAFFE', category: 'Animal' },
    { word: 'ZEBRA', category: 'Animal' },
    { word: 'KANGAROO', category: 'Animal' },
  
    // Countries
    { word: 'CANADA', category: 'Country' },
    { word: 'BRAZIL', category: 'Country' },
    { word: 'INDIA', category: 'Country' },
    { word: 'JAPAN', category: 'Country' },
    { word: 'FRANCE', category: 'Country' },
    { word: 'EGYPT', category: 'Country' },
    { word: 'GERMANY', category: 'Country' },
    { word: 'AUSTRALIA', category: 'Country' },
  
    // Random Objects
    { word: 'CHAIR', category: 'Object' },
    { word: 'TABLE', category: 'Object' },
    { word: 'PENCIL', category: 'Object' },
    { word: 'PHONE', category: 'Object' },
    { word: 'LAMP', category: 'Object' },
    { word: 'CLOCK', category: 'Object' },
    { word: 'SHOE', category: 'Object' },
    { word: 'GUITAR', category: 'Object' },
  
    // Colors
    { word: 'RED', category: 'Color' },
    { word: 'BLUE', category: 'Color' },
    { word: 'GREEN', category: 'Color' },
    { word: 'YELLOW', category: 'Color' },
    { word: 'PURPLE', category: 'Color' },
    { word: 'ORANGE', category: 'Color' },
    { word: 'BLACK', category: 'Color' },
    { word: 'WHITE', category: 'Color' },
  
    // Sports
    { word: 'SOCCER', category: 'Sport' },
    { word: 'TENNIS', category: 'Sport' },
    { word: 'CRICKET', category: 'Sport' },
    { word: 'HOCKEY', category: 'Sport' },
    { word: 'BASKETBALL', category: 'Sport' },
    { word: 'SWIMMING', category: 'Sport' },
    { word: 'GOLF', category: 'Sport' },
    { word: 'BASEBALL', category: 'Sport' }
  ]

// Game Var
let selectedWord = ""
let selectedCategory = ""
let displayedWord = []
let wrongGuesses = 0
const maxGuesses = 6
let score = 0

function startGame() {

    const randomWord = words[Math.floor(Math.random() * words.length)]
    selectedWord = randomWord.word
    selectedCategory = randomWord.category
    displayedWord = Array(selectedWord.length).fill("_")
    wrongGuesses = 0

    console.log(selectedWord)

    wordDisplay.textContent = displayedWord.join(" ")
    categoryDisplay.textContent = selectedCategory
    hangmanImg.src = `images/hangman0.png`

    keyboardButtons.forEach(button => {
        button.disabled = false
        button.style.backgroundColor = "transparent" 
        button.style.color = "#003366"
    })
}

function handleKeyPress(letter, button) {
    button.disabled = true

    if (selectedWord.includes(letter)) {
        // Correct Guess
        selectedWord.split("").forEach((char, index) => {
            if (char === letter) {
                displayedWord[index] = letter
            }
        })
        wordDisplay.textContent = displayedWord.join(" ")
        checkWin()
    } else {
        // Wrong Guess
        wrongGuesses++
        console.log('wrong guesses:' ,wrongGuesses)
        hangmanImg.src = `images/hangman${wrongGuesses}.png`
        checkLoss()
    }
}

// Check Win
function checkWin() {
    if (!displayedWord.includes("_")) {
        winLoseMessage.textContent = 'You Win!'
        winLoseDiv.classList.remove('hidden')

        saveScore(++score)
        userScore.textContent = score
    }
}

// Check Loss
function checkLoss() {
    if (wrongGuesses >= maxGuesses) {
        winLoseMessage.textContent = `Game Over! The word was: ${selectedWord}`
        winLoseDiv.classList.remove('hidden')
    }
}

keyboardButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        handleKeyPress(button.textContent, button)

        // Change the button color after the button is clicked
        button.style.backgroundColor = '#003366' 
        button.style.color = '#ffffff'
    });
});

// Restart Game
restartBtn.addEventListener('click', () => {
    startGame()
    pauseMenu.classList.add('hidden')
})

// Show the pause menu
playButton.addEventListener('click', () => {
  pauseMenu.classList.remove('hidden')
  howToPlaydiv.classList.add('hidden')
})

// Close the pause menu
puseMenuCloseBtn.addEventListener('click', () => {
    pauseMenu.classList.add('hidden')
})

// home button event listener 
homeBtn.addEventListener('click', () => {
  window.location.href = 'index.html'
})

// closing win and lose message 
winLoseMenuCloseBtn.addEventListener('click', () => {
    winLoseDiv.classList.add('hidden')
    startGame()
})

// showing how to play div 
questionMarkBtn.addEventListener('click', () => {
    howToPlaydiv.classList.remove('hidden')
    pauseMenu.classList.add('hidden')
})

// closing how to play div
howToPlayCloseBtn.addEventListener('click', () => {
    howToPlaydiv.classList.add('hidden')
})

// saving the score in a local storage
function saveScore(score) {
    localStorage.setItem('gameScore', score)
  }

// Initialize Game
startGame()


