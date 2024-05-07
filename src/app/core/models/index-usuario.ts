export interface Usuario {
    id: number;
    firstname: string;
    lastname: string;
    birth: Date;
    email: string;
}

export interface CreateUserPayload {
    firstname: string | null;
    lastname: string | null;
    birth: Date | null;
    email: string | null;
}