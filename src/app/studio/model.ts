import { ModelPoint } from './model-point';

export class Model {
    constructor(private _name: string, private _a: ModelPoint, private _b: ModelPoint, private _h: ModelPoint){}
    get name(){
        return this._name;
    }
    get a(){
        return this._a;
    }
    get b(){
        return this._b;
    }
    get h(){
        return this._h;
    }
}