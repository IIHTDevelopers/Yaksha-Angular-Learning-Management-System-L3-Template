import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Progress } from '../models/progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllProgress(): any {
    // write your logic here
    return null;
  }

  getProgressByCourseId(courseId: number): any {
    // write your logic here
    return null;
  }

  getProgressById(progressId: number): any {
    // write your logic here
    return null;
  }

  createProgress(progressData: Progress): any {
    // write your logic here
    return null;
  }

  updateProgress(progressId: number, progressData: Progress): any {
    // write your logic here
    return null;
  }

  deleteProgress(progressId: number): any {
    // write your logic here
    return null;
  }
}
