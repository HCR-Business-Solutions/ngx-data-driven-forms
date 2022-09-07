import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDefaultComponent } from './question-default.component';

describe('QuestionDefaultComponent', () => {
  let component: QuestionDefaultComponent;
  let fixture: ComponentFixture<QuestionDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
