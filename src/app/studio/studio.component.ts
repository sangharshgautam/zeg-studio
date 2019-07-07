import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UvEngineService } from '../uv-engine.service';
import { Model } from './model';
import { ModelPoint } from './model-point';
import { ModelSubjectService } from '../model-subject.service';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {



  @Input()
  scale = 1.0;
  
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private el:ElementRef, private uvEngineService: UvEngineService, private modelSubjectService: ModelSubjectService) { }

  ngOnInit() {
    const model = this.modelSubjectService.model().subscribe((model) => {
      if(model){
        this.draw(model.name, model.a, model.b, model.h);
        //this.fruityPebble();
        this.uvEngineService.render();
      }
    })
    
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
  scaleGeometry(){
    this.uvEngineService.scale(this.scale);
  }
}
