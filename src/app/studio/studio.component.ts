import * as THREE from 'three';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UvEngineService } from '../uv-engine.service';
import { Model } from './model';
import { ModelPoint } from './model-point';
import { ModelSubjectService } from '../model-subject.service';
import { BaseUvEngine } from './abstract-uv.service';
import { BOXES } from '../box-samples/box-samples.component';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent extends BaseUvEngine implements  OnInit {

  constructor(private el:ElementRef, private uvEngineService: UvEngineService, private modelSubjectService: ModelSubjectService) {
    super();
  }
  array = [1, 2, 3, 4];
  boxes = BOXES;
  size = 'small';
  createObject() {
    const geometry = new THREE.BoxGeometry(2, 3, 1);
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    this.object = new THREE.Mesh( geometry, material);
    this.scene.add(this.object);
  }
  ngOnInit() {
    super.createScene();
    this.setGridHelper();
  }
}
