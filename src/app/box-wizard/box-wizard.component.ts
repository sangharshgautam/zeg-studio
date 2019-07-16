import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { Model } from '../studio/model';
import { ModelPoint } from '../studio/model-point';
import { ModelSubjectService } from '../model-subject.service';

@Component({
  selector: 'app-box-wizard',
  templateUrl: './box-wizard.component.html',
  styleUrls: ['./box-wizard.component.scss']
})
export class BoxWizardComponent implements OnInit {

  current = 0;

  file: UploadFile;

  @ViewChild('previewCanvas', {static: true})
  public previewCanvas: ElementRef<HTMLCanvasElement>;

  private model: Model;

  counter = 0;

  constructor(private modelSubjectService: ModelSubjectService) {}
  ngOnInit() {
  }
  ngOnInit2() {
    const canvas = document.getElementById('test-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    canvas.addEventListener('click', (e) => {
      let x = e.pageX;
      x -= canvas.offsetLeft;
      let y = e.pageY;
      y -= canvas.offsetTop;
      // ctx.beginPath();
      // ctx.moveTo(x-100, y-100);
      // ctx.lineTo(x + 100, y + 100);
      // ctx.stroke();
      const point = new ModelPoint(x, y);
      if (this.counter  === 0) {
        console.log(x + ' , '+ y);
        this.model.a = new ModelPoint(x, y);
      }
      if (this.counter  === 1) {
        this.model.b = new ModelPoint(x, y);
      }
      if (this.counter  === 2) {
        this.model.h = new ModelPoint(x, y);
        this.next();
        console.log(this.model);
        this.modelSubjectService.load(this.model);
      }
      this.counter++;
    });
    // document.body.appendChild(canvas);
    
    // const reader = new FileReader();
    // reader.onload = (event) => {
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
    image.src = 'sample/textures/box/Fruity Pebbles Marshmallow Cereal.jpg';
    this.model = new Model('Fruity Pebbles Marshmallow Cereal');
  }

  pre(): void {
    this.current -= 1;
    if (this.current === 0) {
      this.counter = 0;
    }
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }
  handleChange(event) {
    console.log('slected');
    return false;
  }
  test(event) {
    console.log(event);
  }
  onFileSelect(evt) {
    console.log(typeof(evt));
    const canvas = document.getElementById('test-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('click', (e) => {
      this.counter++;
      let x = e.pageX;
      x -= canvas.offsetLeft;
      console.log(x);
      let y = e.pageY;
      y -= canvas.offsetTop;
      const point = new ModelPoint(x, y);
      if (this.counter  === 1) {
        this.model.a = new ModelPoint(x, y);
      }
      if (this.counter  === 2) {
        this.model.b = new ModelPoint(x, y);
      }
      if (this.counter  === 3) {
        this.model.h = new ModelPoint(x, y);
        this.modelSubjectService.load(this.model);
        this.counter = 0;
        this.next();
      }
    });
    const reader = new FileReader();
    reader.onload = (event: Event) => {
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(evt.target.files[0]);
    this.model = new Model(URL.createObjectURL(evt.target.files[0]));
    this.next();
    return false;
  }
}
