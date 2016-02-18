
class Animal {
    feed(){}
    protected isHungry(){ return true;}

}

class Dog extends Animal { barks():boolean {return this.isHungry(); } }
class Cat extends Animal { meows():boolean { return this.isHungry(); } }

var pet = new Dog();

function takeCare( pet:Dog|Cat){
    if(pet instanceof Dog) {
        if ( pet.barks())
            pet.feed();
        }
    else if (pet instanceof Cat) {
        if ( pet.meows()){
            pet.feed();
        }
    }
}

takeCare(pet);


function isDog(pet: Dog|Cat): pet is Dog{
    return pet instanceof Dog;
}

function isCat(pet: Dog|Cat): pet is Cat{
    return pet instanceof Cat;
}
function takeCare2( pet:Dog|Cat){
    if(isDog(pet)) {
        if ( pet.barks())
            pet.feed();
        }
    else if (isCat(pet)) {
        if ( pet.meows()){
            pet.feed();
        }
    }
}
