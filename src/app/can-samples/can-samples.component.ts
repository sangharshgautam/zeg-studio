import { Component, OnInit } from '@angular/core';
import { ModelPoint } from '../studio/model-point';
import { Model } from '../studio/model';
import { ModelSubjectService } from '../model-subject.service';


@Component({
  selector: 'app-can-samples',
  templateUrl: './can-samples.component.html',
  styleUrls: ['./can-samples.component.scss']
})
export class CanSamplesComponent implements OnInit {

  listOfData = [
    { name: '/sample/textures/can/coke_uv_map.jpg' },
    { name : '/sample/textures/can/pepsi.jpg'},
    { name : '/sample/textures/can/cokecan.jpg'},
    { name : '/sample/textures/can/generic_soda_can_label_a.jpg'},
    { name : '/sample/textures/can/pepsi-cola-logo-vector-drawing-thumb-1262-max-600.jpg'}
  ];
  isVisible = false;

  constructor(private modelSubjectService: ModelSubjectService) { }

  ngOnInit() {
  }
  showModel(model: {name: string}): void {
    this.modelSubjectService.load(model.name);
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  handleOk(): void {
    this.handleCancel();
  }

}
