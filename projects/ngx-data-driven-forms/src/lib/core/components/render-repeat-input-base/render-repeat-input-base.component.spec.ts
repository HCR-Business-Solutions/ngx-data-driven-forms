import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderRepeatInputBaseComponent } from './render-repeat-input-base.component';

describe('RenderRepeatInputBaseComponent', () => {
  let component: RenderRepeatInputBaseComponent;
  let fixture: ComponentFixture<RenderRepeatInputBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderRepeatInputBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderRepeatInputBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
