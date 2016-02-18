var T1 = (function () {
    function T1() {
    }
    return T1;
}());
//ok
var x1 = { a: 1, b: "abc" };
//error  in recent releases of Typescript (1.6)
//"Object literal may only specify known properties
//let x2:T1 = { a:1, b:"abc",c:123};
//error "type string is not assignable to type int"
//let y1:T1 = { a:"abc", b:"abc"};
//error "missing property b"
//let y2:T1 = {a:1};
var T2 = (function () {
    function T2() {
        this.a = 0;
    }
    return T2;
}());
//error "missing property a"
//let x3:T2 = {b:"123"};
var T3 = (function () {
    function T3() {
    }
    return T3;
}());
var x4 = new T3();
//ok T3 ritcher than T1
var x5 = x4;
//error T1 is not assignamble to T3
//let x6:T3 = x5;
//# sourceMappingURL=TypeCompatibility.js.map