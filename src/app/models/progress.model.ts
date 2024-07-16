export interface Progress {
    id: number;
    courseId: number;
    studentName: string;
    completedModules: number;
    totalModules: number;
    completionPercentage: number;
}
