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

        checkCharacter(ltr) {
            if (ltr === this.character) {
                this.isGuessed = true;
                return true;
            } else {
                this.isGuessed = false;
                return false;
            }
        }
}

// dummy input
// let a = new Letter("a");
// console.log(a.checkCharacter("a"));
// console.log(a.returnCharacter());

module.exports = Letter;