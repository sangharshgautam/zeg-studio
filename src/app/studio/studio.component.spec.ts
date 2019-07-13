import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioComponent } from './studio.component';
import { NgZorroAntdModule, NzSliderModule, NzInputNumberModule, NzIconModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StudioComponent', () => {
  let component: StudioComponent;
  let fixture: ComponentFixture<StudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgZorroAntdModule, NzSliderModule,NzInputNumberModule, NzIconModule  ],
      declarations: [ StudioComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
