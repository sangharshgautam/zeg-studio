import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model } from './studio/model';

@Injectable({
  providedIn: 'root'
})
export class ModelSubjectService {

  subject = new BehaviorSubject<Model | string>(null);

  constructor() { }
  load(model: Model | string) {
    this.subject.next(model);
  }
  model(): Observable<Model | string> {
    return this.subject.asObservable();
  }
}
