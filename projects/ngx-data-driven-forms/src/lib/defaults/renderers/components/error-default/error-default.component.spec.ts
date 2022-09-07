import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDefaultComponent } from './error-default.component';

describe('ErrorDefaultComponent', () => {
  let component: ErrorDefaultComponent;
  let fixture: ComponentFixture<ErrorDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
