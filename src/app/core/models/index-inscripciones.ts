import { Curso } from "./index-curso";
import { Usuario } from "./index-usuario";

export interface Inscripciones {
    id: number;
    usuario: Usuario;
    curso: Curso;
    
}

export interface CreateInscripcionesData {
    usuario: Usuario | null;
    curso: Curso | null;
    
}