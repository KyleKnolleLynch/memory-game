//  Grab dom elements
const section = document.querySelector('section')
const playerLivesCount = document.querySelector('span')
const alertModal = document.querySelector('.alert-modal')
const restartBtn = document.querySelector('.restart-btn')

//  Set and display lives count
const initialPlayerLives = 10
let playerLives = initialPlayerLives
playerLivesCount.textContent = playerLives

//  Generate Data
const getData = () => [
  { imgSrc: './images/alligator.jpg', name: 'alligator' },
  { imgSrc: './images/bear.jpg', name: 'bear' },
  { imgSrc: './images/donkey.jpg', name: 'donkey' },
  { imgSrc: './images/manatee.jpg', name: 'manatee' },
  { imgSrc: './images/panda.jpg', name: 'panda' },
  { imgSrc: './images/raccoon.jpg', name: 'raccoon' },
  { imgSrc: './images/tiger.jpg', name: 'tiger' },
  { imgSrc: './images/tortoise.jpg', name: 'tortoise' },
  { imgSrc: './images/wolf.jpg', name: 'wolf' },
  { imgSrc: './images/gorilla.jpg', name: 'gorilla' },
]

//  Randomize
const randomize = () => {
  const cardData = [...getData(), ...getData()]
  return cardData.sort(() => Math.random() - 0.5)
}

//  Card generator function
const cardGenerator = () => {
  const cardData = randomize()

  //  Loop through array
  cardData.forEach(item => {
    const card = document.createElement('div')
    const face = document.createElement('img')
    const back = document.createElement('div')
    card.classList = 'card'
    face.classList = 'face'
    back.classList = 'back'

    //  Attach data to cards
    face.src = item.imgSrc
    card.setAttribute('name', item.name)

    //  Attach face and back to cards
    card.appendChild(face)
    card.appendChild(back)
    //  Attach cards to section
    section.appendChild(card)

    //  Add eventlistener to cards and toggleCard class
    card.addEventListener('click', e => {
      card.classList.toggle('toggleCard')
      checkCards(e)
    })
  })
}

//  Check cards
const checkCards = e => {
  const clickedCard = e.target
  clickedCard.classList.add('flipped')

  const flippedCards = document.querySelectorAll('.flipped')
  const toggleCards = document.querySelectorAll('.toggleCard')
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      flippedCards.forEach(card => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none'
      })
    } else {
      flippedCards.forEach(card => {
        card.classList.remove('flipped')
        setTimeout(() => card.classList.remove('toggleCard'), 1000)
      })
      playerLives--
      playerLivesCount.textContent = playerLives
      //  If game is lost
      if (playerLives === 0) {
        setTimeout(() => {
          restart('Better luck next time!', 'firebrick')
        }, 800)
      }
    }
  }
  //  If game is won
  if (toggleCards.length === getData().length * 2) {
    setTimeout(() => {
      restart('You Win!', 'limegreen')
    }, 800)
  }
}

//  Restart function to reset game
const restart = (alertText, bgColor) => {
  let cardData = randomize()
  let faces = document.querySelectorAll('.face')
  let cards = document.querySelectorAll('.card')
  section.style.pointerEvents = 'none'
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard')
    //  setTimeout to delay exposing cards during reset
    setTimeout(() => {
      //  Randomize
      faces[index].src = item.imgSrc
      cards[index].setAttribute('name', item.name)
      cards[index].style.pointerEvents = 'all'
      section.style.pointerEvents = 'all'
    }, 1000)
  })

  playerLives = initialPlayerLives
  playerLivesCount.textContent = playerLives

  //  Display win or lose alert
  setTimeout(() => {
    alertModal.style.opacity = '1'
    alertModal.style.backgroundColor = bgColor
    alertModal.innerHTML = alertText
    restartBtn.style.opacity = '1'
    restartBtn.style.pointerEvents = 'all'
  }, 1000)
}

//  Listen for try again/restart button click and remove alert modal
restartBtn.addEventListener('click', () => {
  alertModal.innerHTML = ''
  alertModal.style.opacity = '0'
  restartBtn.style.opacity = '0'
  restartBtn.style.pointerEvents = 'none'
})

cardGenerator()
