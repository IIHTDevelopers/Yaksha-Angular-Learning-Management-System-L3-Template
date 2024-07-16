import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CreateCourseComponent } from './components/course/create-course/create-course.component';
import { EnrollStudentComponent } from './components/enrollment/enroll-student/enroll-student.component';
import { EnrollmentListComponent } from './components/enrollment/enrollment-list/enrollment-list.component';
import { GradeAssignmentsComponent } from './components/grading/grade-assignments/grade-assignments.component';
import { GradingOverviewComponent } from './components/grading/grading-overview/grading-overview.component';
import { ProgressTrackerComponent } from './components/progress/progress-tracker/progress-tracker.component';
import { ViewProgressComponent } from './components/progress/view-progress/view-progress.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CourseListComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'enrollments', component: EnrollmentListComponent },
  { path: 'enroll-student', component: EnrollStudentComponent },
  { path: 'grades', component: GradingOverviewComponent },
  { path: 'grade-assignments', component: GradeAssignmentsComponent },
  { path: 'progress', component: ViewProgressComponent },
  { path: 'track-progress', component: ProgressTrackerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
