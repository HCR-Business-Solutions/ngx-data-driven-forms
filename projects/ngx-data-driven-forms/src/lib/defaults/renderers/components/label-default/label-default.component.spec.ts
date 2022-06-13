import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDefaultComponent } from './label-default.component';

describe('LabelDefaultComponent', () => {
  let component: LabelDefaultComponent;
  let fixture: ComponentFixture<LabelDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
