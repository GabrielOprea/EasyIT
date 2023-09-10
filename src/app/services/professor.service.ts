import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapter } from '../models/chapter';
import { Course } from '../models/course';
import { Quiz } from '../models/quiz';
import { Question } from '../models/question';
import { Announcement } from '../models/announcement';
import { Material } from '../models/material';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ProfessorService 
{
  constructor(private _http : HttpClient) { }

  acceptRequestForProfessorApproval(curremail: string): Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/acceptstatus/`+curremail);
  }
  
  rejectRequestForProfessorApproval(curremail: string): Observable<any> 
  {
    return this._http.get<any>(`${NAV_URL}/rejectstatus/`+curremail);
  }
  
  getProfessorList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/professorlist`);
  }

  getYoutubeCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/youtubecourselist`);
  }

  getWebsiteCourseList() : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/websitecourselist`);
  }
  
  addAnnouncement(post: Announcement): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/addannouncement`, post);
  }
  
  getCourseListByName(coursename : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/courselistbyname/`+coursename);
  }

  addCourse(course : Course) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addCourse`,course);
  }

  addQuiz(quiz : Quiz) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addQuiz`,quiz);
  }

  
  addQuestion(question : Question) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addQuestion`,question);
  }

  getProfessorListByEmail(email : string) : Observable<any>
  {
    return this._http.get<any>(`${NAV_URL}/professorlistbyemail/`+email);
  }

  addNewChapters(chapter : Chapter) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addnewchapter`,chapter);
  }
  
  addNewMaterials(materials : Material[]) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/addnewmaterials`,materials);
  }
  deleteMaterials(materials : Material[]) : Observable<any>
  {
    return this._http.post<any>(`${NAV_URL}/deletematerials`,materials);
  }

  getProfileDetails(loggedUser : string) : Observable<any>
  {
    return this._http.get(`${NAV_URL}/professorprofileDetails/`+loggedUser);
  }
  
  UpdateUserProfile(professor : any):Observable<any>
  {
    return this._http.put<any>(`${NAV_URL}/updateprofessor`,professor);
  }
  
  getCourseListNames() : Observable<any>
  {
    return this._http.get(`${NAV_URL}/getcoursenames/`);
  }
  
}
