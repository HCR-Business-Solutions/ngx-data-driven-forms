import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderLabelBaseComponent } from './render-label-base.component';

describe('RenderLabelBaseComponent', () => {
  let component: RenderLabelBaseComponent;
  let fixture: ComponentFixture<RenderLabelBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderLabelBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderLabelBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
