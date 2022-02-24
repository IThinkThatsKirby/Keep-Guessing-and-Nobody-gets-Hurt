// get words from api https://random-word-api.herokuapp.com/home DONE
// parse dat data DONE
// make div with ID match to words DONE
// make answer space DONE
// compare answer array with word array DONEish
// make score counter go up
let word = []
let answer = []
let form0 = []
let form1 = []
let i = 0;
let elements = []
let s = 0; //current SCORE
let sBoard = document.getElementById('score')

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
    text.setAttribute('data-id', 'updatable')
    text.classList.add('form-control')
    text.setAttribute('tabindex', index+1)
    text.setAttribute('autocomplete', 'off')
    document.getElementById('answers').appendChild(text)
    document.getElementById('answer0').autofocus
    form1 = document.getElementById('answer'+i)
    
}

// compare

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

function updateForm(){
    if (i < word.length - 1) {
        i++
        form0 = document.getElementById('words'+i)
        form1 = document.getElementById('answer'+i)
        //
        form1.addEventListener('focusout', compare)
    } else if (i = word.length) {
        i = 0
        setTimeout(newRound, 500)
    }
    //
}

// new round function

async function newRound(){
    
    elements = document.querySelectorAll(("[data-id='updatable']"))
    elements.forEach((el)=>{el.remove()})
    word = await getRandomWords()
    word.forEach(createWords)
    word.forEach(createAnswerFields)
    form0 = document.getElementById('words'+i)
    
    let el = document.getElementById('answer0')
    el.focus()
    form1.addEventListener('focusout', compare)
}

// SCORE BOARD

function score(){
    if (s>=0){sBoard.innerHTML = ('Your score: '+s)}
    else {
        s=0
        sBoard.innerHTML = ('ZERO POINTS :(')
    }
}

// function wrapper since await isnt a global layer thing yet :(
window.onload = async () =>{
    word = await getRandomWords()
    word.forEach(createWords)
    word.forEach(createAnswerFields)
    document.getElementById('answer0').focus()
    form1.addEventListener('focusout', compare)
    
}