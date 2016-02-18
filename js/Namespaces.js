var Nmspc;
(function (Nmspc) {
    var a1 = 1;
    Nmspc.a2 = a1;
    var c = 2;
    Nmspc.d = 3;
    function f() { return 1; }
    function f2() { return f(); }
    Nmspc.f2 = f2;
})(Nmspc || (Nmspc = {}));
var Nmspc;
(function (Nmspc) {
    var b1 = 11;
    Nmspc.b2 = b1;
    var c = 22;
    Nmspc.d = 33;
    function g() { return 1; }
    function g2() { return 2; }
    Nmspc.g2 = g2;
    Nmspc.f2(); // ok
    //f(); // error
    var x = Nmspc.a2; //ok
    //var y = a1; //error
    var z = c;
})(Nmspc || (Nmspc = {}));
var Nmspc;
(function (Nmspc) {
    var Internal = (function () {
        function Internal() {
        }
        Internal.prototype.consturctor = function (x) {
            this.x = x;
        };
        return Internal;
    }());
    var External = (function () {
        function External() {
        }
        External.prototype.consturctor = function (x) {
            this.x = x;
        };
        return External;
    }());
    Nmspc.External = External;
    Nmspc.e1 = new External();
    //you can export an instance of a non visible type
    Nmspc.i1 = new Internal();
})(Nmspc || (Nmspc = {}));
var Nmspc;
(function (Nmspc) {
    var e1 = new Nmspc.External();
    //error
    //var i1 = new Internal(); error
    //but you can use an instance
    var i = Nmspc.i1;
})(Nmspc || (Nmspc = {}));
var Nmspc;
(function (Nmspc) {
    var Second;
    (function (Second) {
        function func2() { return 3; }
        Second.func2 = func2;
    })(Second = Nmspc.Second || (Nmspc.Second = {}));
})(Nmspc || (Nmspc = {}));
//# sourceMappingURL=Namespaces.js.map