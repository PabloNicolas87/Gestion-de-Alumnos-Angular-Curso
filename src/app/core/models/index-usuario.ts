export interface Usuario {
    id: number;
    firstname: string | null;
    lastname: string | null;
    birth: Date | null;
    email: string | null;
}

export interface CreateUserPayload {
    firstname: string;
    lastname: string;
    birth: Date;
    email: string;
}