class T1{
    a:number;
    b:string;
}

//ok
let x1:T1 = { a:1, b:"abc"};

//error  in recent releases of Typescript (1.6)
//"Object literal may only specify known properties
//let x2:T1 = { a:1, b:"abc",c:123};

//error "type string is not assignable to type int"
//let y1:T1 = { a:"abc", b:"abc"};

//error "missing property b"
//let y2:T1 = {a:1};

class T2{
    a:number=0;
    b:string;
}

//error "missing property a"
//let x3:T2 = {b:"123"};

class T3{
    a:number;
    b:string;
    c:Date;
}

let x4 = new T3();
//ok T3 ritcher than T1
let x5:T1 = x4;
//error T1 is not assignamble to T3
//let x6:T3 = x5;
