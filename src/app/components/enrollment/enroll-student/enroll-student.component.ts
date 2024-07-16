import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../../services/enrollment.service';
import { CourseService } from '../../../services/course.service';
import { Enrollment } from '../../../models/enrollment.model';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})
export class EnrollStudentComponent implements OnInit {
  courses: Course[] = [];
  enrollment: Enrollment = {
    id: 0,
    courseId: 0,
    studentName: '',
    enrollmentDate: new Date().toISOString().split('T')[0] // ISO date format (e.g., '2024-01-10')
  };

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses) => (this.courses = courses),
      (error) => console.error('Error fetching courses:', error)
    );
  }

  onSubmit(): void {
    this.enrollmentService.createEnrollment(this.enrollment).subscribe(
      (response) => {
        this.router.navigate(['/enrollments']);
      },
      (error) => {
        console.error('Error enrolling student:', error);
      }
    );
  }
}
