import { FormControl } from "@angular/forms";
import { Curso } from "./index-curso";
import { Usuario } from "./index-usuario";

export interface InscripcionesFormulario {
    curso: FormControl<Curso | null>;
    usuario: FormControl<Usuario | null>;
}