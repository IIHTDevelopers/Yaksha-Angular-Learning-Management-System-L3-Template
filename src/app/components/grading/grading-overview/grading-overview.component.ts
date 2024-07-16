import { Component, OnInit } from '@angular/core';
import { GradingService } from '../../../services/grading.service';
import { CourseService } from '../../../services/course.service';
import { Grade } from '../../../models/grading.model';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-grading-overview',
  templateUrl: './grading-overview.component.html',
  styleUrls: ['./grading-overview.component.css']
})
export class GradingOverviewComponent implements OnInit {
  grades: Grade[] = [];
  courses: Course[] = [];

  constructor(
    private gradeService: GradingService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    // write your logic here
  }

  getGrades(): void {
    // write your logic here
  }

  getCourses(): void {
    // write your logic here
  }

  getCourseTitle(courseId: number): string {
    // write your logic here
    return '';
  }

  deleteGrade(gradeId: number): void {
    // write your logic here
  }
}
