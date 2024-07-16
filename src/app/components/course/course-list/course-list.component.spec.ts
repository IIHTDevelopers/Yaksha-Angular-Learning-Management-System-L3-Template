import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../../models/course.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [HttpClientTestingModule],
      providers: [CourseService, { provide: Router, useValue: { navigate: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
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

    it('should display the Courses heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Courses');
    });

    it('should navigate to course details on course click', () => {
      component.viewCourseDetails(1);
      expect(router.navigate).toHaveBeenCalledWith(['/course', 1]);
    });

    it('should navigate to create course page on button click', () => {
      component.createCourse();
      expect(router.navigate).toHaveBeenCalledWith(['/create-course']);
    });
  });
});
