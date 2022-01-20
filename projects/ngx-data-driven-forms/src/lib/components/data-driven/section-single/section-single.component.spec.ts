import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSingleComponent } from './section-single.component';

describe('SectionSingleComponent', () => {
  let component: SectionSingleComponent;
  let fixture: ComponentFixture<SectionSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
