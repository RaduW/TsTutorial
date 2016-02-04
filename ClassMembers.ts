class SomeClass{
    dataMember: number;
    dataMember2: number;
    static sDataMember: number;

    funMember(x: number):number{
        return x;
    }

    static sFunMember(x: number):number{
        return x;
    }
    constructor(dataMember:number, public dataMember3:number){
        this.dataMember = dataMember;
    }
}

var sc = new SomeClass(1,2);
sc.dataMember = 3;
sc.dataMember2 =4;
sc.dataMember3 =5;
sc.funMember(123);
// static members are accessed through the class
SomeClass.sDataMember = 3;
SomeClass.sFunMember(4);
