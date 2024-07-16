import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewProgressComponent } from './view-progress.component';
import { ProgressService } from '../../../services/progress.service';
import { CourseService } from '../../../services/course.service';
import { Progress } from '../../../models/progress.model';
import { Course } from '../../../models/course.model';

describe('ViewProgressComponent', () => {
  let component: ViewProgressComponent;
  let fixture: ComponentFixture<ViewProgressComponent>;
  let progressService: ProgressService;
  let courseService: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProgressComponent],
      imports: [HttpClientTestingModule],
      providers: [ProgressService, CourseService]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProgressComponent);
    component = fixture.componentInstance;
    progressService = TestBed.inject(ProgressService);
    courseService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should fetch all progresses', () => {
      const expectedProgresses: Progress[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', completedModules: 5, totalModules: 10, completionPercentage: 50 },
        { id: 2, courseId: 2, studentName: 'Student 2', completedModules: 8, totalModules: 10, completionPercentage: 80 }
      ];

      component.getProgresses();

      const req = httpTestingController.expectOne(`${progressService.apiUrl}/progress`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProgresses);

      expect(component.progresses).toEqual(expectedProgresses);
    });

    it('should fetch all courses', () => {
      const expectedCourses: Course[] = [
        { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', startDate: '2024-01-01', endDate: '2024-02-01' },
        { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', startDate: '2024-03-01', endDate: '2024-04-01' }
      ];

      component.getCourses();

      const req = httpTestingController.expectOne(`${courseService.apiUrl}/courses`);
      expect(req.request.method).toEqual('GET');
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

  });
});
