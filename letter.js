class Letter {
    constructor(character) {
        this.character = character;
        this.isGuessed;

    this.checkCharacter = function(ltr) {
        if (ltr === character) {
            this.isGuessed = true;
            return true;
        } else {
            this.isGuessed = false;
            return false;
        }
    }

    this.returnCharacter = function () {
        if (this.isGuessed) {
            return character;
        } else {
            return "_";
        }
    }
}
}

// dummy input
var a = new Letter("a");
console.log(a.checkCharacter("a"));
console.log(a.returnCharacter());

module.exports = Letter;