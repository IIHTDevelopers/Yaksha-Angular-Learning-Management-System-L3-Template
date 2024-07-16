import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../services/enrollment.service';
import { CourseService } from '../../../services/course.service';
import { Enrollment } from '../../../models/enrollment.model';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  courses: Course[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    // write your logic here
  }

  getEnrollments(): void {
    // write your logic here
  }

  getCourses(): void {
    // write your logic here
  }

  getCourseTitle(courseId: number): string {
    // write your logic here
    return '';
  }

  deleteEnrollment(enrollmentId: number): void {
    // write your logic here
  }
}
