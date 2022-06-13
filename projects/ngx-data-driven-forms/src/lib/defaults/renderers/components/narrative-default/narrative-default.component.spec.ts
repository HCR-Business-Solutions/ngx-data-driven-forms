import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrativeDefaultComponent } from './narrative-default.component';

describe('NarrativeDefaultComponent', () => {
  let component: NarrativeDefaultComponent;
  let fixture: ComponentFixture<NarrativeDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarrativeDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrativeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
