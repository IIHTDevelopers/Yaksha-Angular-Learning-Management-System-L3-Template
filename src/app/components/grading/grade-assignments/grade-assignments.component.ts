import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradingService } from '../../../services/grading.service';
import { CourseService } from '../../../services/course.service';
import { Grade } from '../../../models/grading.model';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-grade-assignments',
  templateUrl: './grade-assignments.component.html',
  styleUrls: ['./grade-assignments.component.css']
})
export class GradeAssignmentsComponent implements OnInit {
  courses: Course[] = [];
  grade: Grade = {
    id: 0,
    courseId: 0,
    studentName: '',
    assignment: '',
    score: 0,
    feedback: ''
  };

  constructor(
    private gradingService: GradingService,
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
    this.gradingService.createGrade(this.grade).subscribe(
      (response) => {
        this.router.navigate(['/grades']);
      },
      (error) => {
        console.error('Error submitting grade:', error);
      }
    );
  }
}
