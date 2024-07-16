import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../models/grading.model';

@Injectable({
  providedIn: 'root'
})
export class GradingService {
  public apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Grading-related methods
  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/grades`);
  }

  getGradesByCourseId(courseId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/grades?courseId=${courseId}`);
  }

  getGradeById(gradeId: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.apiUrl}/grades/${gradeId}`);
  }

  createGrade(gradeData: Grade): Observable<Grade> {
    return this.http.post<Grade>(`${this.apiUrl}/grades`, gradeData);
  }

  updateGrade(gradeId: number, gradeData: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.apiUrl}/grades/${gradeId}`, gradeData);
  }

  deleteGrade(gradeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/grades/${gradeId}`);
  }
}
