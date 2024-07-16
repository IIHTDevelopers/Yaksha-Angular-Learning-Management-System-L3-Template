import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Progress } from '../models/progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  public apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Progress-related methods
  getAllProgress(): Observable<Progress[]> {
    return this.http.get<Progress[]>(`${this.apiUrl}/progress`);
  }

  getProgressByCourseId(courseId: number): Observable<Progress[]> {
    return this.http.get<Progress[]>(`${this.apiUrl}/progress?courseId=${courseId}`);
  }

  getProgressById(progressId: number): Observable<Progress> {
    return this.http.get<Progress>(`${this.apiUrl}/progress/${progressId}`);
  }

  createProgress(progressData: Progress): Observable<Progress> {
    return this.http.post<Progress>(`${this.apiUrl}/progress`, progressData);
  }

  updateProgress(progressId: number, progressData: Progress): Observable<Progress> {
    return this.http.put<Progress>(`${this.apiUrl}/progress/${progressId}`, progressData);
  }

  deleteProgress(progressId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/progress/${progressId}`);
  }
}
