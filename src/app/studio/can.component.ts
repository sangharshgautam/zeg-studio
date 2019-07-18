import * as THREE from 'three';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { BaseUvEngine } from './abstract-uv.service';
import { ModelSubjectService } from '../model-subject.service';

@Component({
  selector: 'app-can',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class CanComponent extends BaseUvEngine implements OnInit{

  size = 'small';

  imageSrc: string;
  
  constructor(private modelSubjectService: ModelSubjectService){
    super();
  }
  ngOnInit() {
    this.modelSubjectService.model().subscribe((imageSrc) => {
      if(imageSrc){
        this.imageSrc = imageSrc as string;
        super.createScene();
      }
    });
  }

  createObject(){
    
    //Load Texture
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const texture = loader.load(this.imageSrc);

    //Add Texture
    const latheGeom = this.getGeometry();
    
    this.object = new THREE.Mesh(latheGeom, new THREE.MeshStandardMaterial({color: "silver", map: texture}));
    this.scene.add(this.object);
    this.object.geometry.computeBoundingBox();
    
    const size = new THREE.Vector3();
    this.object.geometry.boundingBox.getSize(size);
    
  }
  getLathe() {
    const lathe = new THREE.Path();
    lathe.lineTo(0, 0);
    lathe.absarc(1, 0, 0.125, Math.PI, Math.PI * 2, true);
    lathe.lineTo(1.5, 0.5);
    lathe.lineTo(1.5, 4.5);
    lathe.absarc(1, 5, 0.125, 0, Math.PI, true);
    lathe.lineTo(0, 5);
    return lathe;
  }
  getGeometry() {
    const lathe = this.getLathe();
    const latheGeom = new THREE.LatheBufferGeometry(lathe.getPoints(), 32);
    for(let i = 0; i < latheGeom.attributes.position.count; i++){
      latheGeom.attributes.uv.setY(i, latheGeom.attributes.position.getY(i) > 2.5 ? 1 : 0);
    }
    return latheGeom;
  }
}
