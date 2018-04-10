class Letter {
    constructor(character) {
        this.character = character;
        this.isCorrect = false;
    }
        returnCharacter() {
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

        checkCharacter(guess) {
            if (guess === this.character) {
                this.isCorrect = true;
                return true;
            } else {
                return false;
            }
        }
}

// dummy input
// let a = new Letter("a");
// console.log(a.checkCharacter("a"));
// console.log(a.returnCharacter());

module.exports = Letter;