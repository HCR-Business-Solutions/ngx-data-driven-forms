import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderHintBaseComponent } from './render-hint-base.component';

describe('RenderHintBaseComponent', () => {
  let component: RenderHintBaseComponent;
  let fixture: ComponentFixture<RenderHintBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderHintBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderHintBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
