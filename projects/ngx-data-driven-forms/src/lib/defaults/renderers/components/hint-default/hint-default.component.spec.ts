import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintDefaultComponent } from './hint-default.component';

describe('HintDefaultComponent', () => {
  let component: HintDefaultComponent;
  let fixture: ComponentFixture<HintDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
