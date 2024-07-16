import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  course: Course = {
    id: 0,
    title: '',
    description: '',
    instructor: '',
    startDate: '',
    endDate: ''
  };

  constructor(private courseService: CourseService, private router: Router) { }

  onSubmit(): void {
    // write your logic here
  }
}
