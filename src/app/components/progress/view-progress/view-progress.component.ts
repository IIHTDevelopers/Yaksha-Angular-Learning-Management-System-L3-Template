import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../../services/progress.service';
import { CourseService } from '../../../services/course.service';
import { Progress } from '../../../models/progress.model';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.component.html',
  styleUrls: ['./view-progress.component.css']
})
export class ViewProgressComponent implements OnInit {
  progresses: Progress[] = [];
  courses: Course[] = [];

  constructor(
    private progressService: ProgressService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
  }

  getProgresses(): void {
    // write your logic here
  }

  getCourses(): void {
    // write your logic here
  }

  getCourseTitle(courseId: number): string {
    // write your logic here
    return '';
  }
}
