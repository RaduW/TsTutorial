var i1 = { dataMember: 33, funMember: function (x) { return 22; } };
var ClassWithExplicitImplementation = (function () {
    function ClassWithExplicitImplementation() {
    }
    ClassWithExplicitImplementation.prototype.funMember = function (x) { return x; };
    return ClassWithExplicitImplementation;
}());
var c2 = new ClassWithExplicitImplementation();
i1 = c2;
var ClassWithImplicitImplementation = (function () {
    function ClassWithImplicitImplementation() {
    }
    ClassWithImplicitImplementation.prototype.funMember = function (x) { return x; };
    return ClassWithImplicitImplementation;
}());
var c1 = new ClassWithImplicitImplementation();
i1 = c1;
function f(si) { return 1; }
f(c1);
f(c2);
//# sourceMappingURL=Interface.js.map