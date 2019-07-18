import * as THREE from 'three';
import { Component, OnInit } from '@angular/core';
import { Model } from '../studio/model';
import { ModelSubjectService } from '../model-subject.service';
import { BaseUvEngine } from '../studio/abstract-uv.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent extends BaseUvEngine implements  OnInit {

  model: Model;

  scale = 1;

  constructor(private modelSubjectService: ModelSubjectService){
    super();
  }
  ngOnInit() {
    this.modelSubjectService.model().subscribe((model) => {
      if(model){
        this.model = model as Model;
        super.createScene();
      }
    });
  }
  createObject() {
    const ma = this.model.a;
    const mb = this.model.b;
    const mh = this.model.h;
    const dw = mb.x - ma.x;
    const dl = mh.x - mb.x;
    const dh = mh.y - ma.y;

    const l = dl / dw * this.scale;
    const w = dw / dw * this.scale;
    const h = dh / dw * this.scale;
    const geometry = new THREE.BoxGeometry(l, h, w);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const imageSrc = this.model.name;

    const materialArray = this.loadTextureMaterial(imageSrc, ma, dw, dl, dh);
    this.object = new THREE.Mesh( geometry, materialArray );
    this.scene.add(this.object);

  }
  loadTextureMaterial(imageSrc: string, a: {x: number, y: number}, dw: number, dl: number, dh: number){

    const matAray = new Array<THREE.MeshBasicMaterial>();

    const b = {x: a.x + dw, y: a.y};
    const c = {x: b.x + dl, y: b.y};
    const d = {x: c.x + dw, y: c.y};
    const e = {x: d.x + dl, y: d.y};

    const f = {x: a.x, y: a.y + dh};
    const g = {x: f.x + dw, y: f.y};
    const h = {x: g.x + dl, y: g.y};
    const i = {x: h.x + dw, y: h.y};
    const j = {x: i.x + dl, y: i.y};

    matAray[0] = this.loadTexture(imageSrc, 0, a.x, a.y, g.x, g.y); //right --> right
    matAray[2] = this.loadTexture(imageSrc, 0, b.x, b.y - dw, c.x, c.y); //front --> top
    matAray[1] = this.loadTexture(imageSrc, 0, c.x, c.y, i.x, i.y); //left --> left
    matAray[3] = this.loadTexture(imageSrc, 0, g.x, g.y, h.x, h.y + dw); // back --> bottom
    matAray[4] = this.loadTexture(imageSrc, 0, b.x, b.y, h.x, h.y); //bottom --> front
    matAray[5] = this.loadTexture(imageSrc, 0, d.x, d.y, j.x, j.y); //top --> back

    return matAray;
  }
  loadTexture(imageSrc: string, angle: number, x1, y1, x2, y2) {
    const texture = new THREE.Texture();
    const canvas = document.createElement('canvas');
    if (canvas.getContext) {
      const context = canvas.getContext('2d');
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        const sx = image.width;
        const sy = image.height;
        const dw = x2 - x1;
        const dh = y2 - y1;
        canvas.width = dw;
        canvas.height = dh;

        if (angle !== 0) {
          canvas.width = dh;
          canvas.height = dw;
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate(angle * Math.PI / 180);
          context.drawImage(image, x1, y1, canvas.height, canvas.width, (0 - dw / 2), (0 - dh / 2), canvas.height, canvas.width);
          context.restore();
        } else {
          context.drawImage(image, x1, y1, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        }
        texture.image = canvas;
        texture.needsUpdate = true;
      };
      image.src = imageSrc;
    }
    return new THREE.MeshBasicMaterial({map: texture});
  }
  
}
