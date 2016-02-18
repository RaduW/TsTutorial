export class Cls1{
    f1(s:string):number{ return 1;};
}

class Cls2{
    f1(s:string):number{  return 2;}
}
export { Cls2};
export { Cls2 as Cls22};

export default class Cls3{}
class Cls4{}
//export default Cls4;
