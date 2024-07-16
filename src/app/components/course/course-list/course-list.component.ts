import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses) => (this.courses = courses),
      (error) => console.error('Error fetching courses:', error)
    );
  }

  viewCourseDetails(courseId: number): void {
    this.router.navigate(['/course', courseId]);
  }

  createCourse(): void {
    this.router.navigate(['/create-course']);
  }
}
