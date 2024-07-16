import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateCourseComponent } from './create-course.component';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../../models/course.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCourseComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [CourseService, { provide: Router, useValue: { navigate: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCourseComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should submit course', () => {
      const newCourse: Course = {
        id: 1,
        title: 'New Course',
        description: 'Course Description',
        instructor: 'Instructor Name',
        startDate: '2024-01-01',
        endDate: '2024-02-01'
      };

      component.course = newCourse;

      component.onSubmit();

      const req = httpTestingController.expectOne(`${courseService.apiUrl}/courses`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newCourse);
      req.flush(newCourse);

      expect(router.navigate).toHaveBeenCalledWith(['/courses']);
    });

    it('should display the Create New Course heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Create New Course');
    });

    it('should have a title input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="title"]')).toBeTruthy();
    });

    it('should have a description textarea', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('textarea[name="description"]')).toBeTruthy();
    });

    it('should have an instructor input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="instructor"]')).toBeTruthy();
    });

    it('should have a start date input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="startDate"]')).toBeTruthy();
    });

    it('should have an end date input field', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('input[name="endDate"]')).toBeTruthy();
    });

    it('should have a submit button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Create Course');
    });
  });
});
