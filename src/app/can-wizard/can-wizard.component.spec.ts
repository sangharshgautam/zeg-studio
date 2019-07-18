import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanWizardComponent } from './can-wizard.component';

describe('CanWizardComponent', () => {
  let component: CanWizardComponent;
  let fixture: ComponentFixture<CanWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
