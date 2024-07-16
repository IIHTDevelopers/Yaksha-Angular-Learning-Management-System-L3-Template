import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GradingOverviewComponent } from './grading-overview.component';
import { GradingService } from '../../../services/grading.service';
import { CourseService } from '../../../services/course.service';
import { Grade } from '../../../models/grading.model';
import { Course } from '../../../models/course.model';

describe('GradingOverviewComponent', () => {
  let component: GradingOverviewComponent;
  let fixture: ComponentFixture<GradingOverviewComponent>;
  let gradingService: GradingService;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradingOverviewComponent],
      imports: [HttpClientTestingModule],
      providers: [GradingService, CourseService]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingOverviewComponent);
    component = fixture.componentInstance;
    gradingService = TestBed.inject(GradingService);
    courseService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch all grades', () => {
      const expectedGrades: Grade[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', assignment: 'Assignment 1', score: 90, feedback: 'Great job!' },
        { id: 2, courseId: 2, studentName: 'Student 2', assignment: 'Assignment 2', score: 85, feedback: 'Well done!' }
      ];

      component.getGrades();

      const req = httpTestingController.expectOne(`${gradingService.apiUrl}/grades`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedGrades);

      expect(component.grades).toEqual(expectedGrades);
    });

    it('should fetch all courses', () => {
      const expectedCourses: Course[] = [
        { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', startDate: '2024-01-01', endDate: '2024-02-01' },
        { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', startDate: '2024-03-01', endDate: '2024-04-01' }
      ];

      component.getCourses();

      const req = httpTestingController.expectOne(`${courseService.apiUrl}/courses`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCourses);

      expect(component.courses).toEqual(expectedCourses);
    });

    it('should return the correct course title', () => {
      component.courses = [
        { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', startDate: '2024-01-01', endDate: '2024-02-01' }
      ];

      const courseTitle = component.getCourseTitle(1);
      expect(courseTitle).toBe('Course 1');
    });

    it('should return "Unknown Course" for an invalid course ID', () => {
      const courseTitle = component.getCourseTitle(999);
      expect(courseTitle).toBe('Unknown Course');
    });

    it('should delete a grade', () => {
      const gradeId = 1;
      component.grades = [
        { id: 1, courseId: 1, studentName: 'Student 1', assignment: 'Assignment 1', score: 90, feedback: 'Great job!' },
        { id: 2, courseId: 2, studentName: 'Student 2', assignment: 'Assignment 2', score: 85, feedback: 'Well done!' }
      ];

      component.deleteGrade(gradeId);

      const req = httpTestingController.expectOne(`${gradingService.apiUrl}/grades/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(component.grades.length).toBe(1);
      expect(component.grades.find(g => g.id === gradeId)).toBeUndefined();
    });

    it('should display the Grading Overview heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Grading Overview');
    });

  });
});
