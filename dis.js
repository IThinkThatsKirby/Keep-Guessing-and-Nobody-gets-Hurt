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

// get random words

async function getRandomWords(){
    return fetch('https://random-word-api.herokuapp.com/word?number=10&swear=0')
            .then(res => res.json())
}
// create div of word to type and give ID
function displayWord(words, index){
    text = document.createElement('p')
    text.innerHTML = words
    text.id = 'words'+index
    document.getElementById('words').appendChild(text)
}
// create input fields of answers and give ID based on index
function playerAnswer(array,index){
    text = document.createElement('input')
    text.id = 'answer'+index
    text.placeholder = 'Answer'+ ' ' + index
    document.getElementById('answers').appendChild(text)
}
// compare
function compare(){
    if (form1.value == form0.innerText) {
        form1.style.backgroundColor = 'green'
        console.log(i)
        updateForm()
    } else {
        form1.style.backgroundColor = 'red'
        console.log(i)
        updateForm()
    }
}
// update i
function iUpdate(){
    if (i < word.length - 1) {i++} else {return i = 0} // prevents error throw on tabout of last input
}
//update forms 0 and 1
async function updateForm(){
    await iUpdate()
    console.log(i)
    form0 = document.getElementById('words'+i)
    form1 = document.getElementById('answer'+i)
    console.log(form0)
    form1.addEventListener('focusout', async () => await compare())
}
// function wrapper since await isnt a global layer thing yet :(
window.onload = async () =>{
    word = await getRandomWords()
    
    word.forEach(displayWord)
    word.forEach(playerAnswer)
    form0 = document.getElementById('words'+i)
    form1 = document.getElementById('answer'+i)
    console.log(form0.innerText)
    console.log(form1)
    console.log(i)
    form1.addEventListener('focusout', async () => await compare())
}

