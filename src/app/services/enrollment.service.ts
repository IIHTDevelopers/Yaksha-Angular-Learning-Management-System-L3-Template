import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllEnrollments(): any {
    // write your logic here
    return null;
  }

  getEnrollmentsByCourseId(courseId: number): any {
    // write your logic here
    return null;
  }

  getEnrollmentById(enrollmentId: number): any {
    // write your logic here
    return null;
  }

  createEnrollment(enrollmentData: Enrollment): any {
    // write your logic here
    return null;
  }

  updateEnrollment(enrollmentId: number, enrollmentData: Enrollment): any {
    // write your logic here
    return null;
  }

  deleteEnrollment(enrollmentId: number): any {
    // write your logic here
    return null;
  }
}
