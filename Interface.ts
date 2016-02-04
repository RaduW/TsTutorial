interface SomeInterface {
    dataMember: number;
    funMember(x: number):number;
    //NO static members
    //static sDataMember: number;
    //static sFunMember(x: number):number;
}

let i1 :SomeInterface = { dataMember:33, funMember: function(x:number){return 22;}};

class ClassWithExplicitImplementation implements SomeInterface{
    dataMember:number;
    funMember(x:number){return x;}
}

let c2 = new ClassWithExplicitImplementation();
i1 = c2;


class ClassWithImplicitImplementation{
    dataMember:number;
    funMember(x:number){return x;}
}

let c1 = new ClassWithImplicitImplementation();
i1 = c1;


function f( si: SomeInterface){ return 1;}
f(c1);
f(c2);
