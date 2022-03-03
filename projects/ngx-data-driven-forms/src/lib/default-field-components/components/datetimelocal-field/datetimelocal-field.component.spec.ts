import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatetimelocalFieldComponent} from './datetimelocal-field.component';

describe('DatetimelocalFieldComponent', () => {
  let component: DatetimelocalFieldComponent;
  let fixture: ComponentFixture<DatetimelocalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatetimelocalFieldComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimelocalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
