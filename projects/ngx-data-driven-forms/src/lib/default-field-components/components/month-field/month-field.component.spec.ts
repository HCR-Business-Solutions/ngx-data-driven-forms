import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthFieldComponent } from './month-field.component';

describe('MonthFieldComponent', () => {
  let component: MonthFieldComponent;
  let fixture: ComponentFixture<MonthFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
