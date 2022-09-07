import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatDataDefaultComponent } from './repeat-data-default.component';

describe('RepeatDataDefaultComponent', () => {
  let component: RepeatDataDefaultComponent;
  let fixture: ComponentFixture<RepeatDataDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatDataDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatDataDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
