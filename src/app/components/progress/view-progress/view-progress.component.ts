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
    this.getProgresses();
    this.getCourses();
  }

  getProgresses(): void {
    this.progressService.getAllProgress().subscribe(
      (progresses) => (this.progresses = progresses),
      (error) => console.error('Error fetching progress:', error)
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
}
