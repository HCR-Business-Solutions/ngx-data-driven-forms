import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderHeadingBaseComponent } from './render-heading-base.component';

describe('RenderHeadingBaseComponent', () => {
  let component: RenderHeadingBaseComponent;
  let fixture: ComponentFixture<RenderHeadingBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderHeadingBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderHeadingBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
