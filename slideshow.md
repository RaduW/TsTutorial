class: center, middle

# Typescript fundamentals

---

.center[
## Agenda
]

1. What is Typescript ?
--

1. Typescript types
--

1. Typescript classes
--

1. Typescript interfaces
--

1. Typescript namespaces (internal modules)
--

1. Typescript modules (external modules)
--

1. Declaration merging
--

1. Decorators
--

1. Bits and pieces
    1. template strings (string interpolation)
    1. polymorphic `this` type
    1. `enum` vs `const enum` vs string literal type
    1. destructuring
    1. type alias
    1. union/intersection types and type guards
    1. `async`/`await`
    1. class expressions
    1. user defined type guards


---

.center[
## What is Typescript?
]

--

* JS6 ( ECMAScript2015) transpiler + some other bits

--

* Optional static typing

---

.center[
## Typescript types
]

* Nominal type system (C#, Java, C++, Python, ...) [Wikipedia]
> In computer science, a nominal or nominative type system (or name-based type system) is a major class of type system, in which **compatibility and equivalence of data types is determined by explicit declarations and/or the name of the types**. Nominal systems are used to determine if types are equivalent, as well as if a type is a subtype of another.

--

* Structural type system (Typescript, Go, OCaml, ...) [Wikipedia]
> A structural type system (or property-based type system) is a major class of type system, in which **type compatibility and equivalence are determined by the type's actual structure or definition**, and not by other characteristics such as its name or place of declaration. Structural systems are used to determine if types are equivalent and whether a type is a subtype of another.

---

In Typescript type equivalence is determined by structure

.pull-left[

##### Structures **must** match

```js
class T1{
    a:number;
    b:string;
}

//ok
let x1:T1 = { a:1, b:"abc"};

//error "missing property b"
let y2:T1 = {a:1};

//error "type string is not assignable to type int"
let y1:T1 = { a:"abc", b:"abc"};

//error  in recent releases of Typescript (1.6)
//"Object literal may only specify known properties
let x2:T1 = { a:1, b:"abc", c:123};
```
]

--

.pull-right[

##### Defaults don't help


```js
class T2{
    a:number=0;
    b:string;
}

//error "missing property a"
let x3:T2 = {b:"123"};
```
]

--

.pull-right[

##### Richer types are assignable to poorer types

```js
class T3{
    a:number;
    b:string;
    c:Date;
}

let x4 = new T3();
//ok T3 richer than T1
let x5:T1 = x4;
```
]

--

.pull-left[

##### ... but not the other way around

```js
//error T1 is not assignable to T3
let x6:T3 = x5;
```
]

---

.center[
## Classes
]

.pull-left[

```js

class Simple{
    x: string;
    constructor (x:string){
        this.x = x;
    }
}

```
]

--

.pull-right[


```js
var Simple = (function () {
    function Simple(x) {
        this.x = x;
    }
    return Simple;
}());
```
]

--

.clear.center[
##### Why the IIFE?
]

--

.pull-left[

```js

class Derived extends Simple{
    constructor (){
        super("1234");
    }
}
```
]


.pull-right[

```js
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.call(this, "1234");
    }
    return Derived;
}(Simple));
```
]

--

.clear[
```js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
```
]

---
### Class members

.pull-left[

```js
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
    constructor(dataMember:number,
                public dataMember3:number){
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
```
]

--


.pull-right[


```js
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
```

]
---

.center[
## Interfaces
]

.pull-left[

```js
interface SomeInterface {
    dataMember: number;
    funMember(x: number):number;
    //NO static members !!!
    //static sDataMember: number;
    //static sFunMember(x: number):number;
}

```
]

--

.pull-right[

```js
//NOTHING!!!
```
]

---
.center[
## Interfaces
]

* interfaces have **NO** runtime footprint
--

* their only purpose is to 'assert' about the minimum required structure (of an object)

--

```js
function f( si: SomeInterface){ return 1;}

class ClassWithExplicitImplementation implements SomeInterface{
    dataMember:number;
    funMember(x:number){return x;}
}

var i1: SomeInterface;
let c1 = new ClassWithExplicitImplementation();
i1 = c1;
f(c1);

```

--

```js

class ClassWithImplicitImplementation{
    dataMember:number;
    funMember(x:number){return x;}
}

let c2 = new ClassWithImplicitImplementation();
i1 = c2;
f(c2);
```
--

```js
let i1 :SomeInterface = { dataMember:33, funMember: function(x:number){return 22;}};

```

---

.center[
## Namesapces
]

* used to encapsulate related functionality

--

.pull-left[

```js
namespace Nmspc{
    var a: number = 22;
    export var b: number = a;

    function f(){ return 1;}
    export function f2(){ return f();}
}

```
]

--


.pull-right[

```js
var Nmspc;
(function (Nmspc) {
    var a = 22;
    Nmspc.b = 1;
    function f() { return 1; }
    function f2() { return 2; }
    Nmspc.f2 = f2;
})(Nmspc || (Nmspc = {}));
```
]

--
.clear[

* a namespace becomes an object (or multiple)
]
--

* non exported symbols are hidden in a closure and are accessible only by symbols in the same namespace declaration


---

.center[
## Namesapces
]

.pull-left[

```js
namespace Nmspc{

    var a1: number = 1;
    export var a2: number = a1;
    var c = 2;
    export var d = 3;

    function f(){ return 1;}
    export function f2(){ return f();}

}


namespace Nmspc{
    var b1: number = 11;
    export var b2: number = b1;
    var c = 22;
    export var d = 33;

    function g(){ return 1;}
    export function g2(){ return 2;}


    f2(); // ok
    f(); // error
    var x = a2; //ok
    var y = a1; //error
    var z = c;
}

```
]

--


.pull-right[

```js
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
    f(); // error
    var x = Nmspc.a2; //ok
    var y = a1; //error
    var z = c;
})(Nmspc || (Nmspc = {}));


```
]

---

.center[
## Modules (external modules)
]

TypeScript has the concept of modules (called external modules up to TypeScript 1.4). TypeScript modules are the same as ECMAScript2015 modules.

Modules are stored in files.

A Js file that has a top-level `import` or `export` becomes a module.

A module is always `strict` no need for 'use strict'

---

### Exporting

* Using export declaration

```js
export interface IMyInterface{
    f1(s:string):number;
}
```

--

* using export statements

```js

interface IMyInterface{
    f1(s:string):number;
}
export { IMyInterface};
export { IMyInterface as IYourInterface};
```

--

* default export

```js
export default class SomeClass{}

```

--
```js
class SomeClass{}
export default SomeClass;
```

---

### Importing

* old style

```js
import myModule = require('/myModule');

let cls = new myModule.SomeClass();
```

--

* new style

```js

import { MyClass} from "./myModule";
import { MyClass as MyCls} from "./myModule";
import { Cls1, Cls2 } from "myModule";
import * as myModule from "MyModule";

```

--
* default import

```js
// Imports in MyClass whatever is exported as default
import MyClass from "./myModule";
// below is different we import the symbol MyClass1
import { MyClass1} from "./myModule"; //Different

```

---

.center[
### Declaration spaces
]

* Type Declaration Space
> Contains all the symbols that can be used as type annotations
> Elements from the type declaration space do **NOT** have runtime footprint, they exist only at compilation time.

* Variable Declaration Space
> Contains all the symbols that are created and manipulated by the javascript VM

--

.pull-left[
Varialbe Declaration Space

```js

function f(){ return 33;}
var x:number;
```
]

--
.pull-right[

Type Declaration Space

```js

interface X { a: number}
```
]

--

.clear.center[
 What about classes ?
]

--

.pull-left[
Varialbe Declaration Space

```js

class MyClass{}

var x = new MyClass();

```
]

--
.pull-right[

Type Declaration Space

```js

function doSomething( x:MyClass){};
var w:MyClass = someFunction();

```
]


---

### Import optimizations

* demo in text editor

--

#### Forcing Imports

.pull-left[
Old Style

```js
///<amd-dependency path='./Module2'>
///<amd-dependency path='./a/v/Module3' name="m3">
```
]

--
.pull-right[

New Style, bare imports
```js
import "./Module1";
```
]

---

.center[
## Declaration Merging
]

A way to model various existing Js library patterns

--
* Interfaces

(from the  TypeScript handbook )

```js
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

var box: Box = {height: 5, width: 6, scale: 10};
```
--

* Namespaces (example in editor)

---

.center[
### Merging namespaces with other stuff
]

--

*  **NOTE:**  the namespace must **always** be second.

--
#### `namespace` with `class`

--

.pull-left[

To Model inner classes

```js
class Album {
    label: Album.AlbumLabel;
}
module Album {
    export class AlbumLabel { }
}

var x = new Album();
var y = new Album.AlbumLabel();

```
]

--
.pull-right[


```js
var Album = (function () {
    function Album() {
    }
    return Album;
}());
var Album;
(function (Album) {
    var AlbumLabel = (function () {
        function AlbumLabel() {
        }
        return AlbumLabel;
    }());
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
var x = new Album();
var y = new Album.AlbumLabel();
```
]


---

.center[
### Merging namespaces with other stuff
]

--

#### `namespace` with `function`

--

Many javascript libaries do this


.pull-left[

```js
function nrgsValidator(inputType: string,
        input: ValidationInput): void {
    switch (inputType) {
        case "registerMoney-v1":
            ...
            return;
        case "personalSettings-v1":
            ...
            return;
    }
}

module nrgsValidator {
    export function personalSettingsV1(
        input: IPersonalSettingsInput): void {
        ...
    }
    export function registerMoneyV1(
        input: IRegisterMoneyInput): void {
        ...
    }

```
]

--
.pull-right[

```js

function nrgsValidator(inputType, input) {
    switch (inputType) {
        case "registerMoney-v1":
            //...
            return;
        case "personalSettings-v1":
            //...
            return;
    }
}
var nrgsValidator;
(function (nrgsValidator) {
    function personalSettingsV1(input) {
        //...
    }
    nrgsValidator.personalSettingsV1 = personalSettingsV1;
    function registerMoneyV1(input) {
        //...
    }
    nrgsValidator.registerMoneyV1 = registerMoneyV1;
})(nrgsValidator || (nrgsValidator = {}));

```
]

---

.center[
template strings (string interpolation)
]


.pull-left[

```js
var s1 = 1;
var s2 = 2;
var ts = `${x} + ${y} = ${x+y}`;

```
]

--
.pull-right[

```js
var s1 = 1;
var s2 = 2;
var ts = s1 + " + " + s2 + " = " + (s1 + s2);
```
]
---
.clear.center[
tagged templates
]


.pull-left[

```js
var say = "a bird in hand > two in the bush";
var html = htmlEscape `<div> I would
just like to say : ${say}</div>$`;

// a sample tag function
function htmlEscape(literals, ...placeholders) {
    let result = "";

    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
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
```
]

.pull-right[

```js
var say = "a bird in hand > two in the bush";
var html = (_a = ["<div> I would just like to say : ", "</div>", ""],
    _a.raw = ["<div> I would just like to say : ", "</div>", ""],
    htmlEscape(_a, say, s1));
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
            .replace(/&/g, '&amp;')...
    }
    // add the last literal
    result += literals[literals.length - 1];
    return result;
}
var _a;
```
]

---

.center[
## polymorphic `this`
]

--

```js

class B1{
    f1(): B1{return this;}
    f2(): any{ return this; }
    f3(): this{ return this; }
}

class B2 extends B1{
    f4(): B2{ return this; }
    f5(): any{ return this; }
    f6(): any{ return this; }
}

let b1 = new B1();
let b2 = new B2();


b2.f1().f4();  // ERROR
b2.f2().f4();  // OK
b2.f2().f44(); // OK Although it should be ERROR
b2.f3().f1();  // OK
b2.f3().f6();  // OK
b2.f3().f44(); // ERROR


b1.f3().f2();  // OK
b1.f2().f4();  // OK Although it should be ERROR
b1.f3().f4();  // ERROR

```

---

.center[
## `enum` vs `const enum` vs string literal type
]

* enums are implemented as objects (dictionaries)
* enums are extendable

--

.pull-left[

```js
enum Color{
    red,
    green,
    blue,
}

enum Color{
    magenta = 3,
    purple
}

let someColor:number = Color.red;
let someColorVal:string = Color[0];

```
]
--
.pull-right[

```js
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

```
]
---

.center[
## `enum` vs `const enum` vs string literal type
]


.clear[
* const enums are simple numbers
* const enums are replaced inline
]
--
.pull-left[

```js

const enum Fruits{
    apple,
    orange,
    banana
}

const enum Fruits{
    kiwi = 3
}

let apple:number = Fruits.apple;
let apple1:number = Fruits['apple'];
let appleVal:string = Fruits[0]; // ERROR

```
]
--
.pull-right[

```js
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
//let apple1:string = Fruits[0];
```
]


---

.center[
## `enum` vs `const enum` vs string literal type
]

* introduced in TypeScript 1.8
--

* very useful
--


```js

class CssProps{
    height: number;
    alignment: "center" | "left" | "right";
}

let c = new CssProps();
c.alignment = "center";
c.alignment = "center-left"; //ERROR

```

---

.center[
## destructuring
]

--

.clear[
* arrays
]


.pull-left[

```js
let [a1,b1,c1] = [1,2,3];
//we can jump over unused indexes
let[,,,a2,b2,c2] = [1,2,3,4,5,6,7];
//we can use the rest operator
let[a3,...b3] = [1,2,3,4];
//of course we can combine the two techniques
let[,,a4,b4,...c4] = [1,2,3,4,5,6,7];

```
]

--

.pull-right[

```js

var _a = [1, 2, 3], a1 = _a[0],
    b1 = _a[1], c1 = _a[2];
var _b = [1, 2, 3, 4, 5, 6, 7],
    a2 = _b[3], b2 = _b[4], c2 = _b[5];
var _c = [1, 2, 3, 4], a3 = _c[0], b3 = _c.slice(1);
var _d = [1, 2, 3, 4, 5, 6, 7],
    a4 = _d[2], b4 = _d[3], c4 = _d.slice(4);


```

]

--
.clear[
* objects
]


.pull-left[

```js

let {m1,n1,p1} = {m1:22,n1:33,p1:"abcd"};
//we can go to deeper levels
let {m2,n2:{p2}} = { m2:123, n2: { p2:111}};
//NOTE: the left of : in a destructuring statement
//is NOT a type annotation
//but introduces variable names !!!
let {x1:x,y1:y} = {x1:123,y1:33};

```
]

--

.pull-right[

```js
var _e = { m1: 22, n1: 33, p1: "abcd" }
    , m1 = _e.m1, n1 = _e.n1, p1 = _e.p1;
//we can go to deeper levels
var _f = { m2: 123, n2: { p2: 111 } }
    , m2 = _f.m2, p2 = _f.n2.p2;
//introduces variable names !!!
var _g = { x1: 123, y1: 33 }, x = _g.x1, y = _g.y1;

```

]


---

.center[
## destructuring
]

* sometimes very useful in functions where you would need to introduce a new type

---

.center[
## type alias
]
--

* type aliases have no runtime footprint

--

```js
class Cc{};
class Cd<T>{}
type Ta = Cc;
type CdNum = Cd<number>;

let ta:Ta = new Cc();
let ta2:Ta = new Ta(); //ERROR Remember Declaration spaces

```

---

.center[
## Union
]

--

```js

class Animal {
    feed(){}
    protected isHungry(){ return true;}

}

class Dog extends Animal { barks():boolean {return this.isHungry(); } }
class Cat extends Animal { meows():boolean { return this.isHungry(); } }

var pet = new Dog();

function takeCare( pet:Dog|Cat){
    if(pet instanceof Dog) {
        if ( pet.barks())
            pet.feed();
        }
    else if (pet instanceof Cat) {
        if ( pet.meows()){
            pet.feed();
        }
    }
}

takeCare(pet);


```

---
.center[
## User-Defined Type Guards
]

--

```js

function isDog(pet: Dog|Cat): pet is Dog{
    return pet instanceof Dog;
}

function isCat(pet: Dog|Cat): pet is Cat{
    return pet instanceof Cat;
}
function takeCare2( pet:Dog|Cat){
    if(isDog(pet)) {
        if ( pet.barks())
            pet.feed();
        }
    else if (isCat(pet)) {
        if ( pet.meows()){
            pet.feed();
        }
    }
}

```

---

.center[
## class expressions (Typescript 1.6)
]

--

* similar with lambdas but for classes
* you cannot refer to the type but you can use anything constructed in the Varailbles space

(from TypeScript Blog)

```js

let Point = class {
    constructor(public x: number, public y: number) { }
    public length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
};
var p = new Point(3, 4);  // p has anonymous class type
console.log(p.length());

```

---

.center[
## async/await
]

--

* introduced in TypeScript 1.7

--

* only when transpiling to ES6

--

* needs support for generator functions `function*()`
