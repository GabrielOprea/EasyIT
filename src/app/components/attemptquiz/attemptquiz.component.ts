import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { Review } from 'src/app/models/review';
import { ProfessorService } from 'src/app/services/professor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-attemptquiz',
  templateUrl: './attemptquiz.component.html',
  styleUrls: ['./attemptquiz.component.css']
})
export class AttemptquizComponent implements OnInit{
  quiz = new Quiz();
  review = new Review();
  quizid: string = '';
  questions: Question[] = [];
  answers: string[] = [];
  loggedUser = '';
  msg = ' ';

  constructor(private _userService : UserService, private _professorService : ProfessorService, private _router : Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.quizid = this.route.snapshot.params['quizid'];
    console.log(this.quizid);
    this._userService.getQuiz(this.quizid).subscribe(data => {
      this.quiz = data;
      this._userService.getQuestionlist(this.quizid).subscribe(data => {
        this.questions = data;
        console.log(this.questions);
        for (let quest in this.questions) {
          this.answers.push('');
        }
      });
    })
  }

  uncheckOthers(event:Event, nameattr: string, i: number, variant: string): void {
    let checkbox = event?.target;
    this.answers[i] = variant;
    var checkboxes = document.getElementsByName(nameattr)
    checkboxes.forEach((item) => {
        if (item !== checkbox) {
          let anotherItem = item as HTMLInputElement;
          anotherItem.checked = false
        }
    })
  }

  submitAnswers() {
    this.review.answers = this.answers;
    this.review.email = this.loggedUser;

    this._userService.sendReview(this.review, this.quizid).subscribe(data => {
      console.log("Review sent");
    })
    this._router.navigate(['..'])
  }
}
