import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneFieldComponent } from './phone-field.component';

describe('PhoneFieldComponent', () => {
  let component: PhoneFieldComponent;
  let fixture: ComponentFixture<PhoneFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
