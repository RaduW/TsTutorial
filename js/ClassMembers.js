var SomeClass = (function () {
    function SomeClass(dataMember, dataMember3) {
        this.dataMember3 = dataMember3;
        this.dataMember = dataMember;
    }
    SomeClass.prototype.funMember = function (x) {
        return x;
    };
    SomeClass.sFunMember = function (x) {
        return x;
    };
    return SomeClass;
}());
var sc = new SomeClass(1, 2);
sc.dataMember = 3;
sc.dataMember2 = 4;
sc.dataMember3 = 5;
sc.funMember(123);
// static members are accessed through the class
SomeClass.sDataMember = 3;
SomeClass.sFunMember(4);
//# sourceMappingURL=ClassMembers.js.map