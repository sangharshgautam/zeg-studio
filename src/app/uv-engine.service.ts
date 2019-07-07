import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { Injectable, ElementRef, NgZone, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UvEngineService implements OnDestroy{

  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;
  private cube: THREE.Mesh;

  private frameId: number = null;

  constructor(private ngZone: NgZone){

  }
  createScene(canvasElementRef: ElementRef<HTMLCanvasElement>, a: {x:number, y: number}, dw: number, dl: number, dh: number, scale: number, imageSrc: string) { 
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvasElementRef.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(900, 700);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight( 0x404040 );
    this.light.position.z = 10;
    this.scene.add(this.light);

    const l = dl / dw * scale;
    const w = dw / dw * scale;
    const h = dh / dw * scale;
    const geometry = new THREE.BoxGeometry(l, w, h);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    
    const materialArray = this.loadTextureMaterial(imageSrc, a, dw, dl, dh);
    this.cube = new THREE.Mesh( geometry, materialArray );
    this.scene.add(this.cube);
    
    //Add mouse controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

  }
  loadTextureMaterialColor(){
    const matAray = new Array<THREE.MeshBasicMaterial>();
    for(let i = 0; i<6 ;i ++) {
      matAray[i] = new THREE.MeshBasicMaterial({color: '#000000'});
    }
    return matAray;
  }
  loadTextureMaterial(imageSrc: string, a: {x:number, y: number}, dw: number, dl: number, dh: number){
    
    const matAray = new Array<THREE.MeshBasicMaterial>();
    // matAray[0] = this.loadTexture(imageSrc, true, 43, 137, 173, 662);
    // matAray[2] = this.loadTexture(imageSrc, false, 173, 137, 534, 662);
    // matAray[1] = this.loadTexture(imageSrc, true, 534, 137, 663, 662);
    // matAray[3] = this.loadTexture(imageSrc, false, 663, 137, 1021, 662);
    // matAray[4] = this.loadTexture(imageSrc, false, 173, 662, 534, 797); //bottom
    // matAray[5] = this.loadTexture(imageSrc, false, 173, 5, 534, 137); //top
    
    const b = {x: a.x + dw, y: a.y};
    const c = {x: b.x + dl, y: b.y};
    const d = {x: c.x + dw, y: c.y};
    const e = {x: d.x + dl, y: d.y};
    
    const f = {x: a.x, y: a.y + dh};
    const g = {x: f.x + dw, y: f.y};
    const h = {x: g.x + dl, y: g.y};
    const i = {x: h.x + dw, y: h.y};
    const j = {x: i.x + dl, y: i.y};
  
    
    matAray[0] = this.loadTexture(imageSrc, 90, a.x, a.y, g.x, g.y);
    matAray[2] = this.loadTexture(imageSrc, 0, b.x, b.y, h.x, h.y);
    matAray[1] = this.loadTexture(imageSrc, 90, c.x, c.y, i.x, i.y);
    matAray[3] = this.loadTexture(imageSrc, 0, d.x, d.y, j.x, j.y);
    matAray[4] = this.loadTexture(imageSrc, 0, g.x, g.y, h.x, h.y + dw); //bottom
    matAray[5] = this.loadTexture(imageSrc, 0, b.x, b.y - dw, c.x, c.y); //top

    return matAray;
  }
  loadTexture(imageSrc: string, angle: number, x1, y1, x2, y2) {
    const texture = new THREE.Texture();
    const canvas = document.createElement('canvas');
    if(canvas.getContext) {
      const context = canvas.getContext('2d');
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = function() {
        const sx = image.width;
        const sy = image.height;
        const dw = x2 - x1;
        const dh = y2 - y1;
        canvas.width = dw;
        canvas.height = dh;

        if(angle !== 0) {
          canvas.width = dh;
          canvas.height = dw;
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate(angle * Math.PI / 180);
          context.drawImage(image, x1, y1, canvas.height, canvas.width, (0 - dw / 2), (0 - dh / 2), canvas.height, canvas.width);
          context.restore();
        }else{
          context.drawImage(image, x1, y1, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        }
        texture.image = canvas;
        texture.needsUpdate = true;
      };
      image.src = imageSrc;
    }
    return new THREE.MeshBasicMaterial({map: texture});
  }
  animate(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('DOMContentLoaded', () => {
        this.render();
      });
      window.addEventListener('resize', () => {
        this.resize();
      })
    })
  }
  render() {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    //this.cube.rotation.x +=0.01;
    //this.cube.rotation.y +=0.01;
    this.renderer.render(this.scene, this.camera);
  }
  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }
  ngOnDestroy() {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }
  scale(scale: number){
    this.cube.scale.x = scale;
    this.cube.scale.y = scale;
    this.cube.scale.z = scale;
    this.render();
  }
}
