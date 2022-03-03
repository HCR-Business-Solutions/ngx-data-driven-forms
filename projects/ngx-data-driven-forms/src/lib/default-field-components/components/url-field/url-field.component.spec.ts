import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UrlFieldComponent} from './url-field.component';

describe('UrlFieldComponent', () => {
  let component: UrlFieldComponent;
  let fixture: ComponentFixture<UrlFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrlFieldComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
