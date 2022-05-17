import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderNarrativeBaseComponent } from './render-narrative-base.component';

describe('RenderNarrativeBaseComponent', () => {
  let component: RenderNarrativeBaseComponent;
  let fixture: ComponentFixture<RenderNarrativeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderNarrativeBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderNarrativeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
