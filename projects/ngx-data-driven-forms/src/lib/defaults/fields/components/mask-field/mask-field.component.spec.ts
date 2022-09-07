import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskFieldComponent } from './mask-field.component';

describe('MaskFieldComponent', () => {
  let component: MaskFieldComponent;
  let fixture: ComponentFixture<MaskFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaskFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
