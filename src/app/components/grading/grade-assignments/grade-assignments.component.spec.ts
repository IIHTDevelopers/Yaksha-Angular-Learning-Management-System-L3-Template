import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GradeAssignmentsComponent } from './grade-assignments.component';
import { GradingService } from '../../../services/grading.service';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { Grade } from '../../../models/grading.model';
import { Course } from '../../../models/course.model';

describe('GradeAssignmentsComponent', () => {
  let component: GradeAssignmentsComponent;
  let fixture: ComponentFixture<GradeAssignmentsComponent>;
  let gradingService: GradingService;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradeAssignmentsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [GradingService, CourseService, { provide: Router, useValue: { navigate: jest.fn() } }]
    }).compileComponents();

    fixture = TestBed.createComponent(GradeAssignmentsComponent);
    component = fixture.componentInstance;
    gradingService = TestBed.inject(GradingService);
    courseService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
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

    it('should submit grade', () => {
      const newGrade: Grade = { id: 3, courseId: 1, studentName: 'New Student', assignment: 'Assignment 1', score: 90, feedback: 'Well done!' };

      component.grade = newGrade;

      component.onSubmit();

      const req = httpTestingController.expectOne(`${gradingService.apiUrl}/grades`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newGrade);
      req.flush(newGrade);

      expect(router.navigate).toHaveBeenCalledWith(['/grades']);
    });

    it('should display the Grade Assignments heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Grade Assignments');
    });

    it('should have a student name input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="studentName"]')).toBeTruthy();
    });

    it('should have a course select field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('select[name="courseId"]')).toBeTruthy();
    });

    it('should have an assignment input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="assignment"]')).toBeTruthy();
    });

    it('should have a score input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="score"]')).toBeTruthy();
    });

    it('should have a feedback textarea', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('textarea[name="feedback"]')).toBeTruthy();
    });

    it('should have a submit button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Submit Grade');
    });
  });
});
