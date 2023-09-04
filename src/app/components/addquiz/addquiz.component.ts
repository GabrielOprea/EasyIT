import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent implements OnInit{
  quiz = new Quiz();
  quizid: string = '';
  questions: Question[] = [];
  msg = ' ';

  constructor(private _professorService : ProfessorService, private _router : Router, private route: ActivatedRoute) { }
  ngOnInit(): void {

  }

  addQuestion() {
    console.log("ceva");
    if (this.questions.length > 0)
    console.log(this.questions[0].question);
    var question = new Question();
    this.questions.push(question);
  }
  addQuiz()
  {
    console.log("called!!");
    var courseid = this.route.snapshot.paramMap.get('courseid')!
    this.quiz.courseid = courseid;
    this.quiz.noquestions = this.questions.length.toString();
    this._professorService.addQuiz(this.quiz).subscribe(
      data => {
        console.log("Quiz added Successfully !!!");
        console.log(data);
        this.quizid = data.quizid;
        for (var question of this.questions) {
          question.quizid = this.quizid;
          console.log(question.quizid);
          console.log(this.quizid);
    
          this._professorService.addQuestion(question).subscribe(
            data => {
              console.log("Question added Successfully !!!");
            },
            error => {
              console.log(question);
              console.log(error.error);
            }
          )
        }
        //this._router.navigate(['/addchapter']);
      },
      error => {
        console.log(this.quiz);
        console.log("Process Failed");
        console.log(error.error);
      }
    )

  }
}
