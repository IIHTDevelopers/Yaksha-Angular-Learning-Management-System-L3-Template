import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProgressService } from './progress.service';
import { Progress } from '../models/progress.model';

describe('ProgressService', () => {
  let service: ProgressService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProgressService]
    });
    service = TestBed.inject(ProgressService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch all progress records', () => {
      const expectedProgress: Progress[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', completedModules: 5, totalModules: 10, completionPercentage: 50 },
        { id: 2, courseId: 2, studentName: 'Student 2', completedModules: 8, totalModules: 10, completionPercentage: 80 }
      ];
      service.getAllProgress().subscribe((progress: any) => {
        expect(progress).toEqual(expectedProgress);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProgress);
    });

    it('should get progress by course ID', () => {
      const expectedProgress: Progress[] = [
        { id: 1, courseId: 1, studentName: 'Student 1', completedModules: 5, totalModules: 10, completionPercentage: 50 }
      ];
      service.getProgressByCourseId(1).subscribe((progress: any) => {
        expect(progress).toEqual(expectedProgress);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress?courseId=1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProgress);
    });

    it('should get progress by ID', () => {
      const expectedProgress: Progress = { id: 1, courseId: 1, studentName: 'Student 1', completedModules: 5, totalModules: 10, completionPercentage: 50 };
      service.getProgressById(1).subscribe((progress: any) => {
        expect(progress).toEqual(expectedProgress);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedProgress);
    });

    it('should create a new progress record', () => {
      const newProgress: Progress = { id: 3, courseId: 3, studentName: 'New Student', completedModules: 3, totalModules: 10, completionPercentage: 30 };
      service.createProgress(newProgress).subscribe((progress: any) => {
        expect(progress).toEqual(newProgress);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress`);
      expect(req.request.method).toEqual('POST');
      req.flush(newProgress);
    });

    it('should update progress', () => {
      const updatedProgress: Progress = { id: 1, courseId: 1, studentName: 'Updated Student', completedModules: 7, totalModules: 10, completionPercentage: 70 };
      service.updateProgress(1, updatedProgress).subscribe((progress: any) => {
        expect(progress).toEqual(updatedProgress);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress/1`);
      expect(req.request.method).toEqual('PUT');
      req.flush(updatedProgress);
    });

    it('should delete progress', () => {
      service.deleteProgress(1).subscribe((response: any) => {
        expect(response).toBeNull();
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/progress/1`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
