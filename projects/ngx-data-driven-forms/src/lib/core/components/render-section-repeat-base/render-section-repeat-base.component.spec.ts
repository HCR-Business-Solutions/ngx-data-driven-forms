import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderSectionRepeatBaseComponent } from './render-section-repeat-base.component';

describe('RenderSectionRepeatBaseComponent', () => {
  let component: RenderSectionRepeatBaseComponent;
  let fixture: ComponentFixture<RenderSectionRepeatBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderSectionRepeatBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderSectionRepeatBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
