const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    // ignore if already guessed
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)) return

    if (this.word.includes(letter)) {
      this.correctLetters.push(letter)
      // reveal all positions of the correctly guessed letter
      const chars = this.displayWord.split('')
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) chars[i] = letter
      }
      this.displayWord = chars.join('')
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    const remEl = document.getElementById('remaining-guesses')
    const incEl = document.getElementById('incorrect-letters')
    const wordEl = document.getElementById('word-to-guess')

    remEl.textContent = this.remainingGuesses
    incEl.textContent = this.incorrectLetters.join(', ')
    wordEl.textContent = this.displayWord
  }

  // implement the isGameOver function:
  isGameOver() {
    return this.remainingGuesses <= 0 || this.displayWord === this.word
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) return 'win'
    if (this.displayWord !== this.word && this.remainingGuesses <= 0) return 'loss'
    return null
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()
