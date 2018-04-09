let Letter = require("./letter.js");

class Word {
    constructor() {
        this.letterArray = [];
    }
    toString() {
        let displayWord = "";
        this.letterArray.forEach(letter => {
            let currentLetter = letter.returnCharacter();
            displayWord += currentLetter + " ";
        })
        return displayWord;
    }

    isGuessedLetter(guess) {
        this.letterArray.forEach(letter => {
            letter.checkCharacter(guess);
        })
    }
}

// dummy input
let word = new Word();
let h = new Letter("h");
let a = new Letter("a");
let n = new Letter("n");
let g = new Letter("g");
let m = new Letter("m");
let display = "";
word.letterArray.push(h, a, n, g, m, a, n);
word.letterArray.forEach(letter => {
    display += letter.character + " ";
});
console.log(display);
word.isGuessedLetter("h");
word.isGuessedLetter("n");
console.log(word.toString());
module.exports = Word;