var s1 = 1;
var s2 = 2;
var ts = s1 + " + " + s2 + " = " + (s1 + s2);
var say = "a bird in hand > two in the bush";
var html = (_a = ["<div> I would just like to say : ", "</div>"], _a.raw = ["<div> I would just like to say : ", "</div>"], htmlEscape(_a, say));
// a sample tag function
function htmlEscape(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    var result = "";
    // interleave the literals with the placeholders
    for (var i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    // add the last literal
    result += literals[literals.length - 1];
    return result;
}
var _a;
//# sourceMappingURL=templateStrings.js.map