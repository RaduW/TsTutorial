enum Color{
    red,
    green,
    blue,
}

enum Color{
    magenta = 3,
    purple
}

let someColor:number = Color.red;
let someColorVal:string = Color[0];


const enum Fruits{
    apple,
    orange,
    banana
}

const enum Fruits{
    kiwi = 3
}

let apple:number = Fruits.apple;
let apple1:number = Fruits['apple'];
//let appleVal:string = Fruits[0]; // ERROR

class CssProps{
    height: number;
    alignment: "center" | "left" | "right";
}

let c = new CssProps();
c.alignment = "center";
//c.alignment = "center-left"; //ERROR
