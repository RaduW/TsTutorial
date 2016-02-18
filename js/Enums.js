var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
var Color;
(function (Color) {
    Color[Color["magenta"] = 3] = "magenta";
    Color[Color["purple"] = 4] = "purple";
})(Color || (Color = {}));
var someColor = Color.red;
var someColorVal = Color[0];
var Fruits;
(function (Fruits) {
    Fruits[Fruits["apple"] = 0] = "apple";
    Fruits[Fruits["orange"] = 1] = "orange";
    Fruits[Fruits["banana"] = 2] = "banana";
})(Fruits || (Fruits = {}));
var Fruits;
(function (Fruits) {
    Fruits[Fruits["kiwi"] = 3] = "kiwi";
})(Fruits || (Fruits = {}));
var apple = 0 /* apple */;
var apple1 = 0 /* 'apple' */;
//let appleVal:string = Fruits[0]; // ERROR
var CssProps = (function () {
    function CssProps() {
    }
    return CssProps;
}());
var c = new CssProps();
c.alignment = "center";
//c.alignment = "center-left"; //ERROR
//# sourceMappingURL=Enums.js.map