import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanSamplesComponent } from './can-samples.component';

describe('CanSamplesComponent', () => {
  let component: CanSamplesComponent;
  let fixture: ComponentFixture<CanSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
