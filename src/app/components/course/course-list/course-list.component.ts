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
    // write your logic here
  }

  viewCourseDetails(courseId: number): void {
    // write your logic here
  }

  createCourse(): void {
    // write your logic here
  }
}
