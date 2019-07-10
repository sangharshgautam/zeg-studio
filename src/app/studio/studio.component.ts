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
  
  size = 'large';

  constructor(private el:ElementRef, private uvEngineService: UvEngineService, private modelSubjectService: ModelSubjectService) { }

  ngOnInit() {
    const model = this.modelSubjectService.model().subscribe((model) => {
      if (model){
        this.draw(model.name, model.a, model.b, model.h);
        this.uvEngineService.render();
      }
    })
  }
  draw(image: string, a: ModelPoint, b: ModelPoint, h: ModelPoint) {
    const dw = b.x - a.x;
    const dl = h.x - b.x;
    const dh = h.y - a.y;
    this.uvEngineService.createScene(this.rendererCanvas, a, dw, dl, dh, this.scale, image);
  }
  scaleGeometry(){
    this.uvEngineService.scale(this.scale);
  }
  export(format: string){
    this.uvEngineService.export(format);
  }
}
