import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearNavigatorComponent } from './linear-navigator.component';

describe('LinearNavigatorComponent', () => {
  let component: LinearNavigatorComponent;
  let fixture: ComponentFixture<LinearNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
