import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionErrorsComponent } from './question-errors.component';

describe('QuestionErrorsComponent', () => {
  let component: QuestionErrorsComponent;
  let fixture: ComponentFixture<QuestionErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
