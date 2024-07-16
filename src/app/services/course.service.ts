import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllCourses(): any {
    // write your logic here
    return null;
  }

  getCourseById(courseId: number): any {
    // write your logic here
    return null;
  }

  createCourse(courseData: Course): any {
    // write your logic here
    return null;
  }

  updateCourse(courseId: number, courseData: Course): any {
    // write your logic here
    return null;
  }

  deleteCourse(courseId: number): any {
    // write your logic here
    return null;
  }
}
