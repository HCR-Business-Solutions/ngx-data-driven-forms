import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupComponent } from './question-group.component';

describe('QuestionGroupComponent', () => {
  let component: QuestionGroupComponent;
  let fixture: ComponentFixture<QuestionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
