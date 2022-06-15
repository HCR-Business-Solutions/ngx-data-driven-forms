import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTextBasedFieldComponent } from './generic-text-based-field.component';

describe('GenericTextBasedFieldComponent', () => {
  let component: GenericTextBasedFieldComponent;
  let fixture: ComponentFixture<GenericTextBasedFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericTextBasedFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTextBasedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
