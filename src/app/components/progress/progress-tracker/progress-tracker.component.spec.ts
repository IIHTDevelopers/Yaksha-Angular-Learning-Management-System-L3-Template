import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProgressTrackerComponent } from './progress-tracker.component';
import { ProgressService } from '../../../services/progress.service';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { Progress } from '../../../models/progress.model';
import { Course } from '../../../models/course.model';

describe('ProgressTrackerComponent', () => {
  let component: ProgressTrackerComponent;
  let fixture: ComponentFixture<ProgressTrackerComponent>;
  let progressService: ProgressService;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressTrackerComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [ProgressService, CourseService, { provide: Router, useValue: { navigate: jest.fn() } }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressTrackerComponent);
    component = fixture.componentInstance;
    progressService = TestBed.inject(ProgressService);
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

    it('should submit progress', () => {
      const newProgress: Progress = { id: 3, courseId: 1, studentName: 'New Student', completedModules: 5, totalModules: 10, completionPercentage: 50 };

      component.progress = newProgress;

      component.onSubmit();

      const req = httpTestingController.expectOne(`${progressService.apiUrl}/progress`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProgress);
      req.flush(newProgress);

      expect(router.navigate).toHaveBeenCalledWith(['/progress']);
    });

    it('should display the Progress Tracker heading', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Progress Tracker');
    });

    it('should have a submit button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('button[type="submit"]').textContent).toContain('Submit Progress');
    });
  });
});
