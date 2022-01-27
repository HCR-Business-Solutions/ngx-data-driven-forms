import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekFieldComponent } from './week-field.component';

describe('WeekFieldComponent', () => {
  let component: WeekFieldComponent;
  let fixture: ComponentFixture<WeekFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
