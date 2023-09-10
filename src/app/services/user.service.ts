import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Wishlist } from '../models/wishlist';
import { Chapter } from '../models/chapter';
import { Post } from '../models/post';
import { Review } from '../models/review';
import { Material } from '../models/material';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getQuizlist(courseid: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/quizlist/` + courseid);
  }

  getGrade(quizid: string, email: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getgrade/` + quizid + "/" + email);
  }

  getQuestionlist(quizid: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/questionlist/` + quizid);
  }
  
  getQuiz(quizid: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getquiz/` + quizid);
  }

  getAllUsers(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/userlist`);
  }

  getWebsiteCourseList(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/websitecourselist`);
  }

  getCourseListByName(coursename: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/courselistbyname/` + coursename);
  }

  enrollNewCourse(enrollment: Enrollment, loggedUser: string, currRole: string): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/enrollnewcourse/` + loggedUser + "/" + currRole, enrollment);
  }

  sendReview(review: Review, quizid:string): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/reviewquiz/` + quizid, review);
  }

  addToWishlist(wishlist: Wishlist): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/addtowishlist`, wishlist);
  }

  addPost(post: Post): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/addpost`, post);
  }

  getPostsByCourseid(courseid: string): Observable<any> {
    return this._http.get<Post[]>(`${NAV_URL}/getposts/` + courseid);
  }

  getAnnouncementsByCourseid(courseid: string): Observable<any> {
    return this._http.get<Post[]>(`${NAV_URL}/getannouncements/` + courseid);
  }

  getEnrollmentStatus(coursename: string, loggedUser: string, currRole: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getenrollmentstatus/` + coursename + "/" + loggedUser + "/" + currRole);
  }

  getEnrollmentByEmail(loggedUser: string, currRole: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getenrollmentbyemail/` + loggedUser + "/" + currRole);
  }

  getWishlistStatus(coursename: string, loggedUser: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getwishliststatus/` + coursename + "/" + loggedUser);
  }

  getWishlistByEmail(loggedUser: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getwishlistbyemail/` + loggedUser);
  }

  getAllWishlist(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getallwishlist`);
  }

  getChappterListByCourseName(coursename: string): Observable<Chapter[]> {
    return this._http.get<Chapter[]>(`${NAV_URL}/getchapterlistbycoursename/` + coursename);
  }
  getMaterialListByCourseNameAndType(coursename: string, type: string): Observable<Material[]> {
    return this._http.get<Material[]>(`${NAV_URL}/getmateriallistbycoursenameandtype/` + coursename + '/' + type);
  }
  
  getProfileDetails(loggedUser: string): Observable<any> {
    return this._http.get(`${NAV_URL}/userprofileDetails/` + loggedUser);
  }

  UpdateUserProfile(user: any): Observable<any> {
    return this._http.put<any>(`${NAV_URL}/updateuser`, user);
  }
  getIntermediateCourses(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getIntermediateCourses`);
  }
  getBasicCourses(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getBasicCourses`);
  }
  getAdvancedCourses(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/getAdvancedCourses`);
  }
}
