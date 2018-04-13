let Letter = require("./letter.js");

class Word {
    constructor(letterArray) {
        this.letterArray = letterArray;
    }
    toString() {
        let displayWord = "";
        this.letterArray.forEach(letter => {
            let currentLetter = letter.returnCharacter();
            displayWord += currentLetter + " ";
        })
        return console.log(displayWord + "\n");
    }

    isGuessedLetter(guess) {
        this.letterArray.forEach(letter => {
            letter.checkCharacter(guess);
        })
    }

    completedWord() {
            for (let i = 0; i < this.letterArray.length; i++) {
                
                if (!this.letterArray[i].isCorrect) {
                    return false;  
                }
            }
            return true;
    }
}

// dummy input
// let h = new Letter("h");
// let a = new Letter(" ");
// let n = new Letter("n");
// let g = new Letter("g");
// let m = new Letter("m");
// let word = new Word([h, a, n, g, m, a, n]);

// console.log(word);
// word.isGuessedLetter("h");
// word.isGuessedLetter("n");
// console.log(word.toString());

module.exports = Word;