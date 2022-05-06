let player = {
    name: "Tommy",
    chips: 40,
    hasBlackJack: false,
    hasMoney: true,
    isAlive: false
}
let firstCard
let secondCard
let sum = 0
let cards = []

let playerEl = document.getElementById('player-el')
let messageEl = document.getElementById('message-el')
let sumEl = document.querySelector('#sum-el')
let cardEl = document.querySelector('.cards-el')

playerEl.textContent = player.name + ": $" + player.chips

function startGame(){
    if(player.hasMoney){
        player.chips -= 5
        player.isAlive = true
        player.hasBlackJack = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        let sumMsg = "Sum: " + sum
        let cardMsg = "Card: " + cards[0] + " " + cards[1]
        sumEl.textContent = sumMsg
        cardEl.textContent = cardMsg
        renderGame()
    }
}

function renderGame(){
    let cardMsg = "Card: "
    let infoMsg = ""
    for(let i=0; i<cards.length; i++){
        cardMsg = cardMsg + " " + cards[i]
    }
    cardEl.textContent = cardMsg

    if(cards.length<5){
        if(sum<21){
            infoMsg = "Do you wnat to draw a new card? 😉"
        }else if(sum===21){
            infoMsg = "Wohoo! You've got BlackJack! 😎"
            player.hasBlackJack = true
            player.chips += 15
        }else{
            infoMsg = "You're out of the game... 😖"
            player.isAlive = false
            player.chips -= 5
        }
    }else{
        if(sum<21){
            infoMsg = "You own 5 cards, great job! 😎"
            player.hasBlackJack = true
            player.chips += 15
        }else{
            infoMsg = "You're out of the game... 😖"
            player.isAlive = false
            player.chips -= 5
        }
    }
    messageEl.textContent = infoMsg
    playerEl.textContent = player.name + ": $" + player.chips
    checkPlayerMoney()
}

function addCard(){
    if(!player.hasBlackJack && player.isAlive){
        let newCard = getRandomCard()
        sum += newCard
        sumEl.textContent = "Sum: " + sum
        cards.push(newCard)
        renderGame()
    }
}

function getRandomCard(){
    let randomNumber = Math.ceil(13*Math.random())
    if(randomNumber === 1){
        return 11
    }else if(randomNumber > 10){
        return 10
    }else{
        return randomNumber
    }
}

function checkPlayerMoney(){
    if(player.chips<0.1){
        let infoMsg = "Get out you dummy... 👋"
        messageEl.textContent = infoMsg
        player.hasMoney = false
        player.isAlive = false
    }
}

