import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFieldBaseComponent } from './render-field-base.component';

describe('RenderFieldBaseComponent', () => {
  let component: RenderFieldBaseComponent;
  let fixture: ComponentFixture<RenderFieldBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFieldBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFieldBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
