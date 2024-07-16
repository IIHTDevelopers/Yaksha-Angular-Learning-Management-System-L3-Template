import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should have Learning Management System heading in h1', () => {
            const headingElement = fixture.nativeElement.querySelector('h1');
            expect(headingElement.textContent).toContain('Learning Management System');
        });

        it('should have navigation links', () => {
            const navLinks = fixture.debugElement.queryAll(By.css('nav ul li a'));
            expect(navLinks.length).toBe(8);

            const linkTexts = navLinks.map(link => link.nativeElement.textContent);
            expect(linkTexts).toContain('Courses');
            expect(linkTexts).toContain('Create Course');
            expect(linkTexts).toContain('Enrollments');
            expect(linkTexts).toContain('Enroll Student');
            expect(linkTexts).toContain('Grades');
            expect(linkTexts).toContain('Grade Assignments');
            expect(linkTexts).toContain('Progress');
            expect(linkTexts).toContain('Track Progress');
        });

        it('should navigate to the correct routes', () => {
            const navLinks = fixture.debugElement.queryAll(By.css('nav ul li a'));
            const expectedRoutes = [
                '/courses',
                '/create-course',
                '/enrollments',
                '/enroll-student',
                '/grades',
                '/grade-assignments',
                '/progress',
                '/track-progress'
            ];

            navLinks.forEach((link, index) => {
                const routerLink = link.injector.get(RouterLinkWithHref);
                expect(routerLink.href).toBe(expectedRoutes[index]);
            });
        });
    });
});
