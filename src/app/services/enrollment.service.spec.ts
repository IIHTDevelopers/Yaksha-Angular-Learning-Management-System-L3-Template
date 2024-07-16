import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '../models/enrollment.model';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnrollmentService]
    });
    service = TestBed.inject(EnrollmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all enrollments', () => {
      const expectedEnrollments: Enrollment[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', enrollmentDate: '2024-01-10' },
        { id: 2, courseId: 2, studentName: 'Student 2', enrollmentDate: '2024-02-20' }
      ];
      service.getAllEnrollments().subscribe((enrollments: any) => {
        expect(enrollments).toEqual(expectedEnrollments);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/enrollments`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedEnrollments);
    });

    it('should get enrollments by course ID', () => {
      const expectedEnrollments: Enrollment[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', enrollmentDate: '2024-01-10' }
      ];
      service.getEnrollmentsByCourseId(1).subscribe((enrollments: any) => {
        expect(enrollments).toEqual(expectedEnrollments);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/enrollments?courseId=1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedEnrollments);
    });

    it('should get enrollment by ID', () => {
      const expectedEnrollment: Enrollment = { id: 1, courseId: 1, studentName: 'Student 1', enrollmentDate: '2024-01-10' };
      service.getEnrollmentById(1).subscribe((enrollment: any) => {
        expect(enrollment).toEqual(expectedEnrollment);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/enrollments/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedEnrollment);
    });

    it('should create a new enrollment', () => {
      const newEnrollment: Enrollment = { id: 3, courseId: 3, studentName: 'New Student', enrollmentDate: '2024-03-15' };
      service.createEnrollment(newEnrollment).subscribe((enrollment: any) => {
        expect(enrollment).toEqual(newEnrollment);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/enrollments`);
      expect(req.request.method).toEqual('POST');
      req.flush(newEnrollment);
    });

    it('should update enrollment', () => {
      const updatedEnrollment: Enrollment = { id: 1, courseId: 1, studentName: 'Updated Student', enrollmentDate: '2024-01-10' };
      service.updateEnrollment(1, updatedEnrollment).subscribe((enrollment: any) => {
        expect(enrollment).toEqual(updatedEnrollment);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/enrollments/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedEnrollment);
    });

    it('should delete enrollment', () => {
      service.deleteEnrollment(1).subscribe((response: any) => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/enrollments/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
