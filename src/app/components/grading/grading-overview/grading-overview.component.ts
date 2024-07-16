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
    this.getGrades();
    this.getCourses();
  }

  getGrades(): void {
    this.gradeService.getAllGrades().subscribe(
      (grades) => (this.grades = grades),
      (error) => console.error('Error fetching grades:', error)
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

  deleteGrade(gradeId: number): void {
    this.gradeService.deleteGrade(gradeId).subscribe(
      () => {
        this.grades = this.grades.filter(grade => grade.id !== gradeId);
      },
      (error) => {
        console.error('Error deleting grade:', error);
      }
    );
  }
}
