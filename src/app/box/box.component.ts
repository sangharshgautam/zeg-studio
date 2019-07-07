import { Component, OnInit } from '@angular/core';
import { ModelPoint } from '../studio/model-point';
import { Model } from '../studio/model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  listOfData = [
    new Model('Fruity Pebbles Marshmallow Cereal', new ModelPoint(43, 138), new ModelPoint(172, 138), new ModelPoint(533, 662)),
    new Model('Paris Alexandr Sylvester Stweets', new ModelPoint(0, 403), new ModelPoint(243, 403), new ModelPoint(960, 1526)),
    new Model('Frosted Flakes', new ModelPoint(35, 125), new ModelPoint(148, 125), new ModelPoint(506, 624)),
    new Model('Boom Click Bang', new ModelPoint(23, 111), new ModelPoint(127, 111), new ModelPoint(300, 358)),
    new Model('C-3PO', new ModelPoint(0, 35), new ModelPoint(27, 35), new ModelPoint(118, 172))
  ];
  isVisible = false;

  selectedModel: Model = this.listOfData[4];

  constructor() { }

  ngOnInit() {
  }
  showModel(model: Model): void {
    this.selectedModel = model;
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
