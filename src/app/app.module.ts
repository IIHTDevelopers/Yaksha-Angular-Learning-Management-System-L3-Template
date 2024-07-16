import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseDetailComponent } from './components/course/course-detail/course-detail.component';
import { CreateCourseComponent } from './components/course/create-course/create-course.component';
import { EnrollmentListComponent } from './components/enrollment/enrollment-list/enrollment-list.component';
import { EnrollStudentComponent } from './components/enrollment/enroll-student/enroll-student.component';
import { ProgressTrackerComponent } from './components/progress/progress-tracker/progress-tracker.component';
import { ViewProgressComponent } from './components/progress/view-progress/view-progress.component';
import { GradingOverviewComponent } from './components/grading/grading-overview/grading-overview.component';
import { GradeAssignmentsComponent } from './components/grading/grade-assignments/grade-assignments.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseDetailComponent,
    CreateCourseComponent,
    EnrollmentListComponent,
    EnrollStudentComponent,
    ProgressTrackerComponent,
    ViewProgressComponent,
    GradingOverviewComponent,
    GradeAssignmentsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
