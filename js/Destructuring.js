//
//Arrays
//
{
    var _a = [1, 2, 3], a1 = _a[0], b1_1 = _a[1], c1_1 = _a[2];
    //we can jump over unused indexes
    var _b = [1, 2, 3, 4, 5, 6, 7], a2 = _b[3], b2_1 = _b[4], c2_1 = _b[5];
    //we can use the rest operator
    var _c = [1, 2, 3, 4], a3 = _c[0], b3 = _c.slice(1);
    //of course we can combine the two techniques
    var _d = [1, 2, 3, 4, 5, 6, 7], a4 = _d[2], b4 = _d[3], c4 = _d.slice(4);
}
//
//Objects
//
{
    var _e = { m1: 22, n1: 33, p1: "abcd" }, m1 = _e.m1, n1 = _e.n1, p1 = _e.p1;
    //we can go to deeper levels
    var _f = { m2: 123, n2: { p2: 111 } }, m2 = _f.m2, p2 = _f.n2.p2;
    //NOTE: the left of : in a destructuring statement is NOT a type annotation but
    //introduces variable names !!!
    var _g = { x1: 123, y1: 33 }, x_1 = _g.x1, y_1 = _g.y1;
}
var $http;
function getCountries() {
    $http.get("/api/countries", function (_a) {
        var objects = _a.payload.wrapper.objects;
        console.log(objects);
    });
}
//# sourceMappingURL=Destructuring.js.map