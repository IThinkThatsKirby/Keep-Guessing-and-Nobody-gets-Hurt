// get words from api https://random-word-api.herokuapp.com/home DONE
// parse dat data DONE
// make div with ID match to words
//
let usedWords = [];
let word = []
// get random words

async function getRandomWords(){
    return fetch('https://random-word-api.herokuapp.com/word?number=10&swear=0')
            .then(res => res.json())
}
// create div of word to type
function displayWord(words, index){
    text = document.createElement('p')
    text.innerHTML = words
    text.id = index
    document.getElementById('words').appendChild(text)
}

window.onload = async () =>{
word = await getRandomWords()
console.log(word)
// const words = document.createElement('p');
// words.innerHTML = "this is it";
// document.getElementById('words').appendChild(words);

word.forEach(displayWord)
}

// do thing.