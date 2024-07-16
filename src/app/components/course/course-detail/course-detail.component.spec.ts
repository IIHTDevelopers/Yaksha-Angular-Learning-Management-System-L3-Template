import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CourseDetailComponent } from './course-detail.component';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        CourseService,
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch course details', () => {
      const expectedCourse: Course = {
        id: 1,
        title: 'Course 1',
        description: 'Description 1',
        instructor: 'Instructor 1',
        startDate: '2024-01-01',
        endDate: '2024-02-01'
      };

      component.getCourse();

      const req = httpTestingController.expectOne(`${courseService.apiUrl}/courses/1`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCourse);

      expect(component.course).toEqual(expectedCourse);
    });

    it('should navigate back to courses', () => {
      component.goBack();
      expect(router.navigate).toHaveBeenCalledWith(['/courses']);
    });
  });
});
