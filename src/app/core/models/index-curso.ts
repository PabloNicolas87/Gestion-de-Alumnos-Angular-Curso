export interface Curso {
    id: number;
    name: string;
    schedule: string;
    shift: string;
}

export interface CreateCoursePayload {
    name: string;
    schedule: string;
    shift: string;
}