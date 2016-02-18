class B1{
    f1(): B1{
        console.log("Hello from B1.f1");
        return this;
    }
    f2(): any{
        console.log("Hello from B1.f1");
        return this;
    }
    f3(): this{
        console.log("Hello from B1.f3");
        return this;
    }
}

class B2 extends B1{
    f4(): B2{
        console.log("Hello from B2.f4");
        return this;
    }
    f5(): any{
        console.log("Hello from B2.f5");
        return this;
    }
    f6(): any{
        console.log("Hello from B2.f6");
        return this;
    }
}

let b1 = new B1();
let b2 = new B2();


//b2.f1().f4();
b2.f2().f4();
b2.f2().f44();
b2.f3().f1();
b2.f3().f6();


b1.f3().f2();
