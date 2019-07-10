import { Component, OnInit } from '@angular/core';
import { ModelPoint } from '../studio/model-point';
import { Model } from '../studio/model';
import { BehaviorSubject } from 'rxjs';
import { ModelSubjectService } from '../model-subject.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  listOfData = [
// tslint:disable-next-line: max-line-length
    new Model('/sample/textures/box/Fruity Pebbles Marshmallow Cereal.jpg', new ModelPoint(43, 138), new ModelPoint(172, 138), new ModelPoint(533, 662)),
// tslint:disable-next-line: max-line-length
    new Model('/sample/textures/box/Paris Alexandr Sylvester Stweets.jpg', new ModelPoint(0, 403), new ModelPoint(243, 403), new ModelPoint(960, 1526)),
    new Model('/sample/textures/box/Frosted Flakes.jpg', new ModelPoint(35, 125), new ModelPoint(148, 125), new ModelPoint(506, 624)),
    new Model('/sample/textures/box/Boom Click Bang.jpg', new ModelPoint(23, 111), new ModelPoint(127, 111), new ModelPoint(300, 358)),
    new Model('/sample/textures/box/C-3PO.jpg', new ModelPoint(0, 35), new ModelPoint(27, 35), new ModelPoint(118, 172))
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
