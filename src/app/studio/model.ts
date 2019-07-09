import { ModelPoint } from './model-point';

export class Model {
    private _a: ModelPoint;
    private _b: ModelPoint;
    private _h: ModelPoint;
    constructor(private _name: string, private _a?: ModelPoint, private _b?: ModelPoint, private _h?: ModelPoint){}
    get name() {
        return this._name;
    }
    set name(name1: string) {
        this._name = name1;
    }
    get a(){
        return this._a;
    }
    set a(a1: ModelPoint) {
        this._a = a1;
    }
    get b(){
        return this._b;
    }
    set b(b1: ModelPoint) {
        this._b = b1;
    }
    get h(){
        return this._h;
    }
    set h(h1: ModelPoint) {
        this._h = h1;
    }
}