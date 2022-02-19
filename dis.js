// get words from api https://random-word-api.herokuapp.com/home DONE
// parse dat data DONE
// make div with ID match to words DONE
//make answer space
//compare answer array with word array
let word = []
let answer = []
let form0 = []
let form1 = []

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
// compare answer input.value with displayeWord.
// function compareAnswer(userInput,correctWord,index){
//     if (userInput.value === displayedWord) {
//             document.getElementById('answer'+index).style.backgroundColor = 'green'
//         }
    
// }
// function wrapper since await isnt a global layer thing yet :(
// compare
function compare(){
    if (form1.value == form0.innerText) {
        form1.style.backgroundColor = 'green'
    } else {
        form1.style.backgroundColor = 'red'
    }
}
window.onload = async () =>{
word = await getRandomWords()

word.forEach(displayWord)
word.forEach(playerAnswer)
form0 = document.getElementById('words'+0)
form1 = document.getElementById('answer'+0)
console.log(form0.innerText)
form1.addEventListener('focusout',async () => {
    await compare()
})
}
