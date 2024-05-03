import { Curso } from "./index-curso";
import { Usuario } from "./index-usuario";

export interface Inscripciones {
    id: number;
    curso: Curso;
    usuario: Usuario;
}

export interface CreateInscripcionesData {
    curso: Curso | null;
    usuario: Usuario | null;
}