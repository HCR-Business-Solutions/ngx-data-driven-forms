import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderErrorBaseComponent } from './render-error-base.component';

describe('RenderErrorBaseComponent', () => {
  let component: RenderErrorBaseComponent;
  let fixture: ComponentFixture<RenderErrorBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderErrorBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderErrorBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
