import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsnFieldComponent } from './ssn-field.component';

describe('SsnFieldComponent', () => {
  let component: SsnFieldComponent;
  let fixture: ComponentFixture<SsnFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsnFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SsnFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
