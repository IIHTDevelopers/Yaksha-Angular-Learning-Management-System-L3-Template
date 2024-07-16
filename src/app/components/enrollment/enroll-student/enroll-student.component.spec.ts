import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EnrollStudentComponent } from './enroll-student.component';
import { EnrollmentService } from '../../../services/enrollment.service';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { Enrollment } from '../../../models/enrollment.model';
import { Course } from '../../../models/course.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EnrollStudentComponent', () => {
  let component: EnrollStudentComponent;
  let fixture: ComponentFixture<EnrollStudentComponent>;
  let enrollmentService: EnrollmentService;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollStudentComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [EnrollmentService, CourseService, { provide: Router, useValue: { navigate: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollStudentComponent);
    component = fixture.componentInstance;
    enrollmentService = TestBed.inject(EnrollmentService);
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

    it('should submit enrollment', () => {
      const newEnrollment: Enrollment = { id: 3, courseId: 1, studentName: 'New Student', enrollmentDate: new Date().toISOString().split('T')[0] };

      component.enrollment = newEnrollment;

      component.onSubmit();

      const req = httpTestingController.expectOne(`${enrollmentService.apiUrl}/enrollments`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEnrollment);
      req.flush(newEnrollment);

      expect(router.navigate).toHaveBeenCalledWith(['/enrollments']);
    });

    it('should display the Enroll Student heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Enroll Student');
    });

    it('should have a student name input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="studentName"]')).toBeTruthy();
    });

    it('should have a course select field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('select[name="courseId"]')).toBeTruthy();
    });

    it('should have a submit button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Enroll');
    });
  });
});
