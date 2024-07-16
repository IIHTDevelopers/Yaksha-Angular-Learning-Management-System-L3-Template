import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    // write your logic here
  }

  getCourse(): void {
    // write your logic here
  }

  goBack(): void {
    // write your logic here
  }
}
