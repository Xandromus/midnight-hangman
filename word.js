// variable to require Letter class
let Letter = require("./letter.js");

// class for each word chosen from the array
class Word {
    constructor(letterArray) {
        // variable to hold array of Letter classes created from chosen word
        this.letterArray = letterArray;
    }

    // function to display the word to the user, updating it as letters are guessed correctly
    toString() {
        let displayWord = "";
        this.letterArray.forEach(letter => {
            let currentLetter = letter.returnCharacter();
            displayWord += currentLetter + " ";
        })
        return console.log(displayWord + "\n");
    }

    // function to check each guessed letter determine whether it is correct or not
    isGuessedLetter(guess) {
        this.letterArray.forEach(letter => {
            letter.checkCharacter(guess);
        })
    }

    // function to determine whether word has been completed by user
    completedWord() {
        for (let i = 0; i < this.letterArray.length; i++) {
            if (!this.letterArray[i].isCorrect) {
                return false;
            }
        }
        return true;
    }
}

// export Word class
module.exports = Word;