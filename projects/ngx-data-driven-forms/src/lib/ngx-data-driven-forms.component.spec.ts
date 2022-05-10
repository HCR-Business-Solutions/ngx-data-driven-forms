import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDataDrivenFormsComponent } from './ngx-data-driven-forms.component';

describe('NgxDataDrivenFormsComponent', () => {
  let component: NgxDataDrivenFormsComponent;
  let fixture: ComponentFixture<NgxDataDrivenFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDataDrivenFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDataDrivenFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
