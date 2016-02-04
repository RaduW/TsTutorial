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
    1. declaration spaces
    1. template strings (string interpolation)
    1. polymorphic `this` type
    1. enums vs. const enums
    1. destructuring
    1. type alias
    1. union/intersection types and type guards
    1. async/await
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
