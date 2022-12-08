/**
 * TODO: add start button -> kicks off 30s of random keys jiggling 
 * TODO: jiggle key -> listen for keystrokes and on successful keystroke move to new one 
 */

const GameState = {
  STOPPED: 'STOPPED',
  STARTED: 'STARTED',
  PAUSED: 'PAUSED'
}

/**
 * Global variables
 */
let countdownTimer = 5
let activeKeys = {}
let intervalId = undefined
let currGameState = GameState.STOPPED
const keyMap = Object.values(document.getElementsByClassName('key'))

document.addEventListener('keydown', (e) => {
  userInput(e.key.toUpperCase())
}, false)

function startGame() {
  currGameState = GameState.STARTED
  intervalId = setInterval(() => {
    if (countdownTimer <= 0) {
      clearInterval(intervalId)
      countdownTimer = 5
      currGameState = GameState.STOPPED
      endGame()
    }
    countdownTimer--
    // jiggle random key 
    const currKey = keyMap[Math.floor(Math.random() * keyMap.length)]
    activeKeys[currKey.textContent] = currKey
    currKey.classList.add('jiggle')
  }, 1000)
}

// clear interval and restart
function restartGame() {
  clearInterval(intervalId)
}

function endGame() {
  keyMap.forEach((k) => {
    k.classList.remove('jiggle')
  })
}

// TODO: listen to keyboard clicks
function userInput(key) {
  if (currGameState !== GameState.STARTED) return

  if (key in activeKeys) {
    activeKeys[key].classList.remove('jiggle')
  }
}