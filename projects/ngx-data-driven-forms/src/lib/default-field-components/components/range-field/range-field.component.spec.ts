import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeFieldComponent } from './range-field.component';

describe('RangeFieldComponent', () => {
  let component: RangeFieldComponent;
  let fixture: ComponentFixture<RangeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
