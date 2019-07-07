import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UvEngineService } from '../uv-engine.service';
import { Model } from './model';
import { ModelPoint } from './model-point';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {

  scale = 1.5;
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  @Input()
  private model: Model;

  constructor(private el:ElementRef, private uvEngineService: UvEngineService) { }

  ngOnInit() {
    this.draw(this.model.name, this.model.a, this.model.b, this.model.h);
    //this.fruityPebble();
    this.uvEngineService.render();
  }
  draw(image: string, a: ModelPoint, b: ModelPoint, h: ModelPoint) {
    const dw = b.x - a.x;
    const dl = h.x - b.x;
    const dh = h.y - a.y;
    this.uvEngineService.createScene(this.rendererCanvas, a, dw, dl, dh, this.scale, 'sample/textures/box/'+image+'.jpg');
  }
  fruityPebble(){
    const a = {x: 43, y: 137};
    const dw = 173 - a.x;
    const dl = 534 - 173;
    const dh = 662 - a.y;

    this.uvEngineService.createScene(this.rendererCanvas, a, dw, dl, dh, this.scale, 'sample/textures/box/Fruity Pebbles Marshmallow Cereal.jpg');
    
  }
  luckyCharm(){
    const a = {x: 43, y: 137};
    const dw = 220 - a.x;
    const dl = 534 - 220;
    const dh = 660 - a.y;

    this.uvEngineService.createScene(this.rendererCanvas, a, dw, dl, dh, this.scale, 'sample/textures/box/Lucky Charms Chocolate Cereal.jpg');
    
    
  }
}
