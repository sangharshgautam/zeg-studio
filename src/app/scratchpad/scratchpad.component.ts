import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.scss']
})
export class ScratchpadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const canvas = document.getElementById('test-canvas') as HTMLCanvasElement;
    this.draw(canvas, false);
    const canvasRotated = document.getElementById('test-canvas') as HTMLCanvasElement;
    this.draw(canvasRotated, true);
  }

  draw(canvas: HTMLCanvasElement, rotate: boolean){
    if(canvas.getContext) {
      const context = canvas.getContext('2d');
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = function() {
        const sx = image.width;
        const sy = image.height;
        const x1 = 85, y1 = 135;
        const x2 = 220, y2 = 660;
        const dw = x2 - x1;
        const dh = y2 - y1;
        canvas.width = dw;
        canvas.height = dh;

        if(rotate) {
          canvas.width = dh;
          canvas.height = dw;
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate(90 * Math.PI / 180);
          context.drawImage(image, x1, y1, canvas.height, canvas.width, (0 - dw / 2), (0 - dh / 2), canvas.height, canvas.width);
          context.restore();
        }else{
          context.drawImage(image, x1, y1, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        }

      };
      image.src = 'sample/textures/box/Fruity Pebbles Marshmallow Cereal.jpg';
    }
  }
}
