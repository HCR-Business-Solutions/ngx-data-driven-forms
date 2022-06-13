import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatInputDefaultComponent } from './repeat-input-default.component';

describe('RepeatInputDefaultComponent', () => {
  let component: RepeatInputDefaultComponent;
  let fixture: ComponentFixture<RepeatInputDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatInputDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatInputDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
