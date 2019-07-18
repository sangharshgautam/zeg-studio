import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSamplesComponent } from './box-samples.component';

describe('BoxSamplesComponent', () => {
  let component: BoxSamplesComponent;
  let fixture: ComponentFixture<BoxSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
