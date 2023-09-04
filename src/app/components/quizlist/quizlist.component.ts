import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';
import { ProfessorService } from 'src/app/services/professor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quizlist',
  templateUrl: './quizlist.component.html',
  styleUrls: ['./quizlist.component.css']
})
export class QuizlistComponent implements OnInit {
  loggedUser = '';
  currRole = '';
  courseid: string = '';
  quizlist: Observable<Quiz[]> | undefined;
  toGrades = new Map();

  constructor(private route: ActivatedRoute, private _service: ProfessorService, private userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.currRole = this.currRole.replace(/"/g, '');

    this.courseid = this.route.snapshot.paramMap.get('courseid')!
    this.quizlist = this.userService.getQuizlist(this.courseid)
    this.quizlist.subscribe(quizdata => {

      for (let crtquiz of quizdata) {
        this.userService.getGrade(crtquiz.quizid, this.loggedUser).subscribe(gradedata => {
          this.toGrades.set(crtquiz.quizid, gradedata.grade)
        }, error => {
          this.toGrades.set(crtquiz.quizid, 'Incomplete')
        })
      }
    });
  }

  addQuiz() {
    this._router.navigate(['../../addquiz', this.courseid])
    console.log('aici')
  }
  getStatus(quiz: Quiz): string {
    if (quiz.quizname == "FEEDBACK") {
      if (this.toGrades.get(quiz.quizid) != "Incomplete") {
        return "Complete"
      } else {
        return "Incomplete"
      }
    } else {
      if (this.toGrades.get(quiz.quizid) != "Incomplete") {
        return "Graded with " + this.toGrades.get(quiz.quizid) + " out of 100"
      } else {
        return this.toGrades.get(quiz.quizid);
      }
    }
  }
  editQuiz(id: string) {
    console.log('aici')
  }
  attemptQuiz(id: string) {
    console.log('aici')
    this._router.navigate(['/attemptquiz', id]);
  }
}
