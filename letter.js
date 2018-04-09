class Letter {
    constructor(character) {
        this.character = character;
        this.isGuessed;
    }
        returnCharacter() {
            if (this.isGuessed) {
                return this.character;
            } else {
                return "_";
            }
        }

        checkCharacter(guess) {
            if (this.character === " ") {
                this.isGuessed = true;
            }
            if (guess === this.character) {
                this.isGuessed = true;
            } else {
                this.isGuessed = false;
            }
        }
}

// dummy input
// let a = new Letter("a");
// console.log(a.checkCharacter("a"));
// console.log(a.returnCharacter());

module.exports = Letter;