import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionListItemComponent } from './section-list-item.component';

describe('SectionListItemComponent', () => {
  let component: SectionListItemComponent;
  let fixture: ComponentFixture<SectionListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
