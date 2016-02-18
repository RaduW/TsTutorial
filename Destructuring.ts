//
//Arrays
//
{
let [a1,b1,c1] = [1,2,3];
//we can jump over unused indexes
let[,,,a2,b2,c2] = [1,2,3,4,5,6,7];
//we can use the rest operator
let[a3,...b3] = [1,2,3,4];
//of course we can combine the two techniques
let[,,a4,b4,...c4] = [1,2,3,4,5,6,7];
}
//
//Objects
//
{
let {m1,n1,p1} = {m1:22,n1:33,p1:"abcd"};
//we can go to deeper levels
let {m2,n2:{p2}} = { m2:123, n2: { p2:111}};
//NOTE: the left of : in a destructuring statement is NOT a type annotation but
//introduces variable names !!!
let {x1:x,y1:y} = {x1:123,y1:33};

}

interface $http{
    get(url:string, handler:any):any;
}

var $http:$http;
interface ICountryInfo{
    Id: number;
    name: string;
    code: string;
}

function getCountries():void{
    $http.get("/api/countries",  ({payload:{wrapper:{objects}}})=>{
        console.log(objects);
    });
}
