import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderPageBaseComponent } from './render-page-base.component';

describe('RenderPageBaseComponent', () => {
  let component: RenderPageBaseComponent;
  let fixture: ComponentFixture<RenderPageBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderPageBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderPageBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
