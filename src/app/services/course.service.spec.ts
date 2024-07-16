import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all courses', () => {
      const expectedCourses: Course[] = [
        { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', startDate: '2024-01-01', endDate: '2024-02-01' },
        { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', startDate: '2024-03-01', endDate: '2024-04-01' }
      ];
      service.getAllCourses().subscribe((courses: any) => {
        expect(courses).toEqual(expectedCourses);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/courses`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCourses);
    });

    it('should get course by ID', () => {
      const expectedCourse: Course = { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', startDate: '2024-01-01', endDate: '2024-02-01' };
      service.getCourseById(1).subscribe((course: any) => {
        expect(course).toEqual(expectedCourse);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/courses/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCourse);
    });

    it('should create a new course', () => {
      const newCourse: Course = { id: 3, title: 'New Course', description: 'New Description', instructor: 'New Instructor', startDate: '2024-05-01', endDate: '2024-06-01' };
      service.createCourse(newCourse).subscribe((course: any) => {
        expect(course).toEqual(newCourse);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/courses`);
      expect(req.request.method).toEqual('POST');
      req.flush(newCourse);
    });

    it('should update course', () => {
      const updatedCourse: Course = { id: 1, title: 'Updated Course', description: 'Updated Description', instructor: 'Updated Instructor', startDate: '2024-01-01', endDate: '2024-02-01' };
      service.updateCourse(1, updatedCourse).subscribe((course: any) => {
        expect(course).toEqual(updatedCourse);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/courses/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedCourse);
    });

    it('should delete course', () => {
      service.deleteCourse(1).subscribe((response: any) => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/courses/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
