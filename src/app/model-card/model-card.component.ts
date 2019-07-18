import { Component, OnInit, Input } from '@angular/core';
import { Model } from '../studio/model';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss']
})
export class ModelCardComponent implements OnInit {

  @Input()
  model: Model

  constructor() { }

  ngOnInit() {
  }
  export(format){
    alert('Not implemented');
  }
}
