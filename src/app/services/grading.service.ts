import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../models/grading.model';

@Injectable({
  providedIn: 'root'
})
export class GradingService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllGrades(): any {
    // write your logic here
    return null;
  }

  getGradesByCourseId(courseId: number): any {
    // write your logic here
    return null;
  }

  getGradeById(gradeId: number): any {
    // write your logic here
    return null;
  }

  createGrade(gradeData: Grade): any {
    // write your logic here
    return null;
  }

  updateGrade(gradeId: number, gradeData: Grade): any {
    // write your logic here
    return null;
  }

  deleteGrade(gradeId: number): any {
    // write your logic here
    return null;
  }
}
