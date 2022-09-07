import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDefaultComponent } from './application-default.component';

describe('ApplicationDefaultComponent', () => {
  let component: ApplicationDefaultComponent;
  let fixture: ComponentFixture<ApplicationDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
