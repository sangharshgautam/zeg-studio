import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UvEngineService } from '../uv-engine.service';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {

  scale = 1.5;
  length = 2.32;
  width = 1;
  height = 3.83;

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private uvEngineService: UvEngineService) { }

  ngOnInit() {
    this.fruityPebble();
    this.uvEngineService.render();
  }
  fruityPebble(){
    const a = {x: 43, y: 137};
    const dw = 173 - a.x;
    const dl = 534 - 173;
    const dh = 662 - a.y;

    this.uvEngineService.createScene(this.rendererCanvas, a, dw, dl, dh, this.scale, 'sample/textures/box/Fruity Pebbles Marshmallow Cereal.jpg');
    
  }
  luckyCharm(){
    const a = {x: 86, y: 135};
    const dw = 220 - a.x;
    const dl = 534 - 220;
    const dh = 660 - a.y;

    this.uvEngineService.createScene(this.rendererCanvas, a, dw, dl, dh, this.scale, 'sample/textures/box/Lucky Charms Chocolate Cereal.jpg');
    
    
  }
}
