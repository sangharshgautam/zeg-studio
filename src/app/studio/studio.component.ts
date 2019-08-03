import * as THREE from 'three';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UvEngineService } from '../uv-engine.service';
import { Model } from './model';
import { ModelPoint } from './model-point';
import { ModelSubjectService } from '../model-subject.service';
import { BaseUvEngine } from './abstract-uv.service';
import { BOXES } from '../box-samples/box-samples.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BoxGeometry } from 'three';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent extends BaseUvEngine implements  OnInit {
  validateForm: FormGroup;
  
  width = new FormControl(2, [Validators.required]);
  depth = new FormControl(1, [Validators.required]);
  height = new FormControl(3, [Validators.required]);

  constructor(private fb: FormBuilder, private el:ElementRef, private uvEngineService: UvEngineService, private modelSubjectService: ModelSubjectService) {
    super();
  }
  boxes = BOXES;
  size = 'small';
  isCollapsed = true;
  createObject() {
    const geometry = this.getGeometry();
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    this.object = new THREE.Mesh( geometry, material);
    this.scene.add(this.object);
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      width: this.width,
      height: this.height,
      depth: this.depth
    });
    super.createScene();
    //this.setGridHelper();
  }
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  dimensionChanged(){
    this.resize();
  }
  private resize(){
    this.object.geometry.dispose()
    this.object.geometry = this.getGeometry();
  }
  private getGeometry(){
    return new THREE.BoxGeometry(this.width.value, this.height.value, this.depth.value);
  }
}
