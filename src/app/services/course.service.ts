import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Course-related methods
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${courseId}`);
  }

  createCourse(courseData: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, courseData);
  }

  updateCourse(courseId: number, courseData: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${courseId}`, courseData);
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${courseId}`);
  }
}
