import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderApplicationBaseComponent } from './render-application-base.component';

describe('RenderApplicationBaseComponent', () => {
  let component: RenderApplicationBaseComponent;
  let fixture: ComponentFixture<RenderApplicationBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderApplicationBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderApplicationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
