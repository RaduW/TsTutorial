namespace Nmspc{
    var a1: number = 1;
    export var a2: number = a1;
    var c = 2;
    export var d = 3;

    function f(){ return 1;}
    export function f2(){ return f();}
}

namespace Nmspc{
    var b1: number = 11;
    export var b2: number = b1;
    var c = 22;
    export var d = 33;

    function g(){ return 1;}
    export function g2(){ return 2;}

    f2(); // ok
    //f(); // error
    var x = a2; //ok
    //var y = a1; //error
    var z = c;
}

namespace Nmspc{

    class Internal{
        x: string;
        consturctor (x:string){
            this.x = x;
        }
    }
    export class External{
        x: string;
        consturctor (x:string){
            this.x = x;
        }
    }
    export var e1 = new External();
    //you can export an instance of a non visible type
    export var i1 = new Internal();
}


namespace Nmspc{
    var e1 = new External();
    //error
    //var i1 = new Internal(); error
    //but you can use an instance
    var i = i1;
}

namespace Nmspc.Second{
    export function func2(){return 3;}
    
}
