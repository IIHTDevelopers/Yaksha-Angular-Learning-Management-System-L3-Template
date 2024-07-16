import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GradingService } from './grading.service';
import { Grade } from '../models/grading.model';

describe('GradingService', () => {
  let service: GradingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GradingService]
    });
    service = TestBed.inject(GradingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all grades', () => {
      const expectedGrades: Grade[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', assignment: 'Assignment 1', score: 90, feedback: 'Great job!' },
        { id: 2, courseId: 2, studentName: 'Student 2', assignment: 'Assignment 2', score: 85, feedback: 'Well done!' }
      ];
      service.getAllGrades().subscribe((grades: any) => {
        expect(grades).toEqual(expectedGrades);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/grades`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedGrades);
    });

    it('should get grades by course ID', () => {
      const expectedGrades: Grade[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', assignment: 'Assignment 1', score: 90, feedback: 'Great job!' }
      ];
      service.getGradesByCourseId(1).subscribe((grades: any) => {
        expect(grades).toEqual(expectedGrades);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/grades?courseId=1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedGrades);
    });

    it('should get grade by ID', () => {
      const expectedGrade: Grade = { id: 1, courseId: 1, studentName: 'Student 1', assignment: 'Assignment 1', score: 90, feedback: 'Great job!' };
      service.getGradeById(1).subscribe((grade: any) => {
        expect(grade).toEqual(expectedGrade);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/grades/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedGrade);
    });

    it('should create a new grade', () => {
      const newGrade: Grade = { id: 3, courseId: 3, studentName: 'New Student', assignment: 'New Assignment', score: 95, feedback: 'Excellent!' };
      service.createGrade(newGrade).subscribe((grade: any) => {
        expect(grade).toEqual(newGrade);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/grades`);
      expect(req.request.method).toEqual('POST');
      req.flush(newGrade);
    });

    it('should update grade', () => {
      const updatedGrade: Grade = { id: 1, courseId: 1, studentName: 'Updated Student', assignment: 'Updated Assignment', score: 92, feedback: 'Good improvement!' };
      service.updateGrade(1, updatedGrade).subscribe((grade: any) => {
        expect(grade).toEqual(updatedGrade);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/grades/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedGrade);
    });

    it('should delete grade', () => {
      service.deleteGrade(1).subscribe((response: any) => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/grades/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
