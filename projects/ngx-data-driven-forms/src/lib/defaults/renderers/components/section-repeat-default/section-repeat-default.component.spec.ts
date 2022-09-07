import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRepeatDefaultComponent } from './section-repeat-default.component';

describe('SectionRepeatDefaultComponent', () => {
  let component: SectionRepeatDefaultComponent;
  let fixture: ComponentFixture<SectionRepeatDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionRepeatDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionRepeatDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
