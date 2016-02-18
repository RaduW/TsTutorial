var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Animal = (function () {
    function Animal() {
    }
    Animal.prototype.feed = function () { };
    Animal.prototype.isHungry = function () { return true; };
    return Animal;
}());
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        _super.apply(this, arguments);
    }
    Dog.prototype.barks = function () { return this.isHungry(); };
    return Dog;
}(Animal));
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        _super.apply(this, arguments);
    }
    Cat.prototype.meows = function () { return this.isHungry(); };
    return Cat;
}(Animal));
var pet = new Dog();
function takeCare(pet) {
    if (pet instanceof Dog) {
        if (pet.barks())
            pet.feed();
    }
    else if (pet instanceof Cat) {
        if (pet.meows()) {
            pet.feed();
        }
    }
}
takeCare(pet);
function isDog(pet) {
    return pet instanceof Dog;
}
function isCat(pet) {
    return pet instanceof Cat;
}
function takeCare2(pet) {
    if (isDog(pet)) {
        if (pet.barks())
            pet.feed();
    }
    else if (isCat(pet)) {
        if (pet.meows()) {
            pet.feed();
        }
    }
}
//# sourceMappingURL=UnionIntersectionTypes.js.map