import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../../services/progress.service';
import { CourseService } from '../../../services/course.service';
import { Progress } from '../../../models/progress.model';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  courses: Course[] = [];
  progress: Progress = {
    id: 0,
    courseId: 0,
    studentName: '',
    completedModules: 0,
    totalModules: 0,
    completionPercentage: 0
  };

  constructor(
    private progressService: ProgressService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // write your logic here
  }

  getCourses(): void {
    // write your logic here
  }

  onSubmit(): void {
    // write your logic here
  }
}
