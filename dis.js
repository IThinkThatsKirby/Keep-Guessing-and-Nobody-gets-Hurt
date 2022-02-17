// get words from api https://random-word-api.herokuapp.com/home DONE
// parse dat data DONE
// make div with ID match to words DONE
//make answer space
//compare answer array with word array
let word = []
let answer = []
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
function playerAnswer(answers, index){
    text = document.createElement('input')
    text.innerHTML = answers
    text.id = 'answer'+index
    text.placeholder = 'Answer'+ ' ' + index
    document.getElementById('answers').appendChild(text)
}
// function wrapper since await isnt a global layer thing yet :(
window.onload = async () =>{
word = await getRandomWords()
//console.log(word)
// const words = document.createElement('p');
// words.innerHTML = "this is it";
// document.getElementById('words').appendChild(words);

word.forEach(displayWord)
word.forEach(playerAnswer)
}

if (document.getElementsByTagName('input').innerHTML === document.getElementsByTagName('text').value
){
console.log('yay')}