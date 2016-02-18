var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B1 = (function () {
    function B1() {
    }
    B1.prototype.f1 = function () {
        console.log("Hello from B1.f1");
        return this;
    };
    B1.prototype.f2 = function () {
        console.log("Hello from B1.f1");
        return this;
    };
    B1.prototype.f3 = function () {
        console.log("Hello from B1.f3");
        return this;
    };
    return B1;
}());
var B2 = (function (_super) {
    __extends(B2, _super);
    function B2() {
        _super.apply(this, arguments);
    }
    B2.prototype.f4 = function () {
        console.log("Hello from B2.f4");
        return this;
    };
    B2.prototype.f5 = function () {
        console.log("Hello from B2.f5");
        return this;
    };
    B2.prototype.f6 = function () {
        console.log("Hello from B2.f6");
        return this;
    };
    return B2;
}(B1));
var b1 = new B1();
var b2 = new B2();
//b2.f1().f4();
b2.f2().f4();
b2.f2().f44();
b2.f3().f1();
b2.f3().f6();
b1.f3().f2();
//# sourceMappingURL=PolymorphicThis.js.map