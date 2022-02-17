// get words from api https://random-word-api.herokuapp.com/home DONE
// parse dat data DONE
// pick random letter from word
// place random letter at 10 second interval
//
let usedWords = [];
let word = []

// get random words

async function getRandomWords(){
    let response = await fetch('https://random-word-api.herokuapp.com/word?number=10&swear=0')
    let data = await response.json()
    // console.log(data)
    //word.push([...data])
    return data
}
// getRandomWords()
// setTimeout(()=>console.log(word),2000)
// async function pickRandomWord(){
//     usedWords.push  = await getRandomWords()

// }
// put a random word in word array
window.onload = async () =>{
word = await getRandomWords()

}

// do thing.