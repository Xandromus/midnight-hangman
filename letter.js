// class for each letter being displayed/checked
class Letter {
    constructor(character) {
        this.character = character;
        this.isCorrect = false;
    }
    // function to display each letter in word as underscore if not yet guessed and as the actual lettter when it has been guessed
    returnCharacter() {
        // returns space if in selected word and sets its correct status as true
        if (this.character === " ") {
            this.isCorrect = true;
            return " ";
        }
        if (this.isCorrect) {
            return this.character;
        } else {
            return "_";
        }
    }

    // function to set letter's correct status to true if guessed by user
    checkCharacter(guess) {
        if (guess === this.character) {
            this.isCorrect = true;
            return true;
        } else {
            return false;
        }
    }
}

// export Letter class
module.exports = Letter;