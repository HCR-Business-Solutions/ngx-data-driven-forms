import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderSectionBaseComponent } from './render-section-base.component';

describe('RenderSectionBaseComponent', () => {
  let component: RenderSectionBaseComponent;
  let fixture: ComponentFixture<RenderSectionBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderSectionBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderSectionBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
