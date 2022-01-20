import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTableComponent } from './section-table.component';

describe('SectionTableComponent', () => {
  let component: SectionTableComponent;
  let fixture: ComponentFixture<SectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
