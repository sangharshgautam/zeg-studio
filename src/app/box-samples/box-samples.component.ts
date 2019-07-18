
import { Component, OnInit } from '@angular/core';
import { ModelPoint } from '../studio/model-point';
import { Model } from '../studio/model';
import { ModelSubjectService } from '../model-subject.service';

@Component({
  selector: 'app-box-samples',
  templateUrl: './box-samples.component.html',
  styleUrls: ['./box-samples.component.scss']
})
export class BoxSamplesComponent implements OnInit {
  listOfData = [
    new Model('Fruity Pebbles Marshmallow Cereal.jpg', new ModelPoint(43, 138), new ModelPoint(172, 138), new ModelPoint(533, 662)),
    new Model('Paris Alexandr Sylvester Stweets.jpg', new ModelPoint(0, 403), new ModelPoint(243, 403), new ModelPoint(960, 1526)),
    new Model('Frosted Flakes.jpg', new ModelPoint(35, 125), new ModelPoint(148, 125), new ModelPoint(506, 624)),
    new Model('Boom Click Bang.jpg', new ModelPoint(23, 111), new ModelPoint(127, 111), new ModelPoint(300, 358)),
    new Model('C-3PO.jpg', new ModelPoint(0, 35), new ModelPoint(27, 35), new ModelPoint(118, 172))
  ];
  isVisible = false;

  constructor(private modelSubjectService: ModelSubjectService) { }

  ngOnInit() {
  }
  showModel(model: Model): void {
    this.modelSubjectService.load(model);
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  handleOk(): void{
    this.handleCancel();
  }
}
