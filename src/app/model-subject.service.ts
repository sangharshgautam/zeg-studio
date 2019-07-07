import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model } from './studio/model';

@Injectable({
  providedIn: 'root'
})
export class ModelSubjectService {

  subject = new BehaviorSubject<Model>(null);

  constructor() { }
  load(model: Model) {
    this.subject.next(model);
  }
  model(): Observable<Model> {
    return this.subject.asObservable();
  }
}
