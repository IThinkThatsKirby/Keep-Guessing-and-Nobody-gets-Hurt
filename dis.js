// get words from api https://random-word-api.herokuapp.com/home DONE
// parse dat data DONE
// make div with ID match to words DONE
// make answer space DONE
// compare answer array with word array DONE.
// make score counter go up or down DONE.
// i was going to add a user picker but I cant do this project anymore. im burned out. i just find myself staring at this code for hours.
let word = []
let answer = []
let form0 = []
let form1 = []
let i = 0; // used to sync word and user input for comparison
let s = 0; //current SCORE
let sBoard = document.getElementById('score')
let userName
let currentScore = []
// let currentScore = {name:userName,score:s}
let highScoreList = document.getElementById('highScore')
let highScores = []
let saveScores = {}
let scores = []
function getStoredScores(){
    return JSON.parse(localStorage.getItem('saveScores'))
}
// save current and past user with scores to object and save to local storage
function saveAllScores(){
    saveScores.name = userName
    saveScores.score = s
    let test = {userName,s}
    scores.push(test)
    // this is super broken the way i wrote it. I'd have to write a function to figure out weather or not i need to actually push a new object or change one already made.
    localStorage.setItem('score',JSON.stringify(scores))
    
}

// get random words

async function getRandomWords(){
    return fetch('https://random-word-api.herokuapp.com/word?number=10&swear=0')
            .then(res => res.json())
}

// create div of word to type and give ID

function createWords(words, index){
    text = document.createElement('div')
    text.innerHTML = words
    text.id = 'words'+index
    text.setAttribute('data-id', 'updatable')
    text.classList.add('form-control')
    document.getElementById('words').appendChild(text)
    form0 = document.getElementById('words'+i)
}

// create input fields of answers and give ID based on index

function createAnswerFields(array,index){
    text = document.createElement('input')
    text.id = 'answer'+index
    text.placeholder = 'Answer'+ ' ' + index
    text.setAttribute('data-id', 'clearable')
    text.classList.add('form-control')
    text.setAttribute('tabindex', index+1)
    text.setAttribute('autocomplete', 'off')
    document.getElementById('answers').appendChild(text)
    form1 = document.getElementById('answer'+i)
}

// compare and update current score

function compare(){
    if (form1.value == form0.innerText) {
        form1.style.backgroundColor = 'green'
        form1.readOnly = true
        // score stuff
        s++
        score()
        updateForm()
    } else {
        form1.style.backgroundColor = 'red'
        form1.readOnly = true
        // score stuff
        s = s - 1
        score()
        updateForm()
    }
}

//update forms 0 and 1

async function updateForm(){
    if (i < word.length - 1) {
        i++
        form0 = document.getElementById('words'+i)
        form1 = document.getElementById('answer'+i)
        //
        form1.addEventListener('focusout', compare)
    } else if (i = word.length) {
        i=0
        form1 = document.getElementById('answer'+i)
        await form1.focus()
        setTimeout(updateForms,1000)
    }
    //
}

// makes a pause for round reset

async function updateForms(){        
        userAnswers = document.querySelectorAll("[data-id='clearable']")
        userAnswers.forEach((userAnswers)=>{
            userAnswers.value=''
            userAnswers.style.backgroundColor = 'white'
        })
        setTimeout(newRound, 500)
}

// lets answer forms be used again

function readAgain(el){el.removeAttribute('readOnly')}

// new round function

async function newRound(){
    let elements = document.querySelectorAll(("[data-id='updatable']"))
    elements.forEach((el)=>{el.remove()})
    let userAnswers = document.querySelectorAll("[data-id='clearable']")
    userAnswers.forEach(()=>{userAnswers.value ='0'})
    word = await getRandomWords()
    word.forEach(createWords)
    form0 = document.getElementById('words'+i)
    userAnswers.forEach(readAgain)
    form1.addEventListener('focusout', compare)
}

// SCORE BOARD

function score(){
    if (s>=0){
        sBoard.innerHTML = (userName+' your score is : '+s)
        saveAllScores()
    } else {
        saveAllScores()
        s=0
        sBoard.innerHTML = (userName+' you have ZERO POINTS :(')
    }
}

// high scores

// get userName from or add to localStorage

async function getUserName(){
    return prompt('what is your name')
}

// function wrapper since await isnt a global thing yet :(

window.onload = async () =>{
    word = await getRandomWords()
    userName =  await getUserName()
    let start = document.getElementById('start')
    start.addEventListener('focusout',form1.focus)
    highScores = await getStoredScores()
    highScoreList.innerHTML = (highScores.name+ ' ' + highScores.score)
    gameStarter()
}
// makes the tables for game.
async function gameStarter(){
    word.forEach(createWords)
    word.forEach(createAnswerFields)
    // document.getElementById('answer0').autofocus

    form1.addEventListener('focusout', compare)
}