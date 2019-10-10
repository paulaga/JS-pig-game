
let currentScore, scores, activePlayer, isGameOn, previousRoll, pointsInput, pointsToWin
let defaultInput = document.getElementsByTagName('input')[0].defaultValue

newGame()

document.querySelector('.btn-roll').addEventListener("click", function() {
  if (isGameOn) {
    let dice = Math.floor(Math.random() * 6) + 1
    let diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = `dice-${dice}.png`
    
    if (dice !== 1) {
      if (dice === 6 && previousRoll === dice) {
        scores[activePlayer] = 0
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]
        changePlayer()
      }
      currentScore += dice
      document.getElementById(`current-${activePlayer}`).textContent = currentScore
    } else {
      changePlayer()
    }
    previousRoll = dice
  }

})

document.querySelector('.btn-hold').addEventListener("click", function() {
  if(isGameOn) {
    pointsInput = document.getElementsByTagName('input')[0].value
    if (pointsInput) {
      pointsToWin = Number(pointsInput)
    } else {
      pointsToWin = 100
    }
    console.log(pointsToWin)
    scores[activePlayer] = scores[activePlayer] += currentScore
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]
    if (scores[activePlayer] >= pointsToWin) {
      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER !'
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
      document.querySelector('.dice').style.display = 'none'
      isGameOn = false
    } else {
      changePlayer()
    }
  }
})

document.querySelector('.btn-new').addEventListener("click", newGame)

changePlayer = () => {
  previousRoll = 0
  currentScore = 0
  document.getElementById(`current-${activePlayer}`).textContent = currentScore
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  document.querySelector('.dice').style.display = 'none'
  document.querySelector(`.player-0-panel`).classList.toggle('active')
  document.querySelector(`.player-1-panel`).classList.toggle('active')
}

function newGame() {
  document.getElementsByTagName('input')[0].value = defaultInput
  isGameOn = true
  currentScore = 0
  scores = [0, 0]

  document.querySelector('.dice').style.display = 'none'
  document.getElementById(`name-0`).textContent = 'Player 1'
  document.getElementById(`name-1`).textContent = 'Player 2'

  document.querySelector(`.player-0-panel`).classList.remove('winner')
  document.querySelector(`.player-1-panel`).classList.remove('winner')
  document.querySelector(`.player-0-panel`).classList.add('active')
  document.querySelector(`.player-1-panel`).classList.remove('active')

  document.getElementById(`score-0`).textContent = scores[0]
  document.getElementById(`score-1`).textContent = scores[1]
  document.getElementById(`current-0`).textContent = currentScore
  document.getElementById(`current-1`).textContent = currentScore
  activePlayer = 0
  previousRoll = 0
}