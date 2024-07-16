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
    this.getEnrollments();
    this.getCourses();
  }

  getEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe(
      (enrollments) => (this.enrollments = enrollments),
      (error) => console.error('Error fetching enrollments:', error)
    );
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses) => (this.courses = courses),
      (error) => console.error('Error fetching courses:', error)
    );
  }

  getCourseTitle(courseId: number): string {
    const course = this.courses.find((course) => course.id === courseId);
    return course ? course.title : 'Unknown Course';
  }

  deleteEnrollment(enrollmentId: number): void {
    this.enrollmentService.deleteEnrollment(enrollmentId).subscribe(
      () => {
        this.enrollments = this.enrollments.filter(enrollment => enrollment.id !== enrollmentId);
      },
      (error) => {
        console.error('Error deleting enrollment:', error);
      }
    );
  }
}
