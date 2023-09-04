import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizlistComponent } from './quizlist.component';

describe('QuizlistComponent', () => {
  let component: QuizlistComponent;
  let fixture: ComponentFixture<QuizlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizlistComponent]
    });
    fixture = TestBed.createComponent(QuizlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
