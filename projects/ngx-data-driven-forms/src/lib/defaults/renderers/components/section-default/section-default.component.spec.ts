import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDefaultComponent } from './section-default.component';

describe('SectionDefaultComponent', () => {
  let component: SectionDefaultComponent;
  let fixture: ComponentFixture<SectionDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
