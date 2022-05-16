import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderRepeatDataBaseComponent } from './render-repeat-data-base.component';

describe('RenderRepeatDataBaseComponent', () => {
  let component: RenderRepeatDataBaseComponent;
  let fixture: ComponentFixture<RenderRepeatDataBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderRepeatDataBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderRepeatDataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
