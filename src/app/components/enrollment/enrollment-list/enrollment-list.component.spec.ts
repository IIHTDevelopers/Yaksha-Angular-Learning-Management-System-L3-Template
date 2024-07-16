import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnrollmentListComponent } from './enrollment-list.component';
import { EnrollmentService } from '../../../services/enrollment.service';
import { CourseService } from '../../../services/course.service';
import { Enrollment } from '../../../models/enrollment.model';
import { Course } from '../../../models/course.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EnrollmentListComponent', () => {
  let component: EnrollmentListComponent;
  let fixture: ComponentFixture<EnrollmentListComponent>;
  let enrollmentService: EnrollmentService;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentListComponent],
      imports: [HttpClientTestingModule],
      providers: [EnrollmentService, CourseService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentListComponent);
    component = fixture.componentInstance;
    enrollmentService = TestBed.inject(EnrollmentService);
    courseService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch all enrollments', () => {
      const expectedEnrollments: Enrollment[] = [
        { id: 1, studentName: 'Student 1', courseId: 1, enrollmentDate: '2024-01-01' },
        { id: 2, studentName: 'Student 2', courseId: 2, enrollmentDate: '2024-02-01' }
      ];

      component.getEnrollments();

      const req = httpTestingController.expectOne(`${enrollmentService.apiUrl}/enrollments`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedEnrollments);

      expect(component.enrollments).toEqual(expectedEnrollments);
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

    it('should delete an enrollment', () => {
      const enrollmentId = 1;
      component.enrollments = [
        { id: 1, studentName: 'Student 1', courseId: 1, enrollmentDate: '2024-01-01' },
        { id: 2, studentName: 'Student 2', courseId: 2, enrollmentDate: '2024-02-01' }
      ];

      component.deleteEnrollment(enrollmentId);

      const req = httpTestingController.expectOne(`${enrollmentService.apiUrl}/enrollments/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      expect(component.enrollments.length).toBe(1);
      expect(component.enrollments.find(e => e.id === enrollmentId)).toBeUndefined();
    });

    it('should display the Enrollments heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Enrollments');
    });

  });
});
