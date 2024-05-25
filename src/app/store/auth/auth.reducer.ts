import { createReducer, on } from "@ngrx/store";
import { Usuario } from "../../core/models/index-usuario";
import { authActions } from "./auth.actions";

export interface AuthState {
    authUser: null | Usuario;
}

const initialState : AuthState = {
    authUser: null
}

const MOCK_AUTH_USER: Usuario = {
    id: 1,
    firstname: 'Pablo',
    lastname: 'Girone',
    email: 'pablo1@gmail.com',
    birth: new Date('12/8/1988')
  }

export const authFeatureName = 'auth';

export const authReducer = createReducer( initialState,
    on(authActions.login, (state, action) => {
      if (action.payload.email !== 'usuario1@mail.com' || action.payload.password !== '123456') {
        alert('Datos incorrectos');
        return state;
      } else { 
        localStorage.setItem('accessToken', '123');
      }

      return {
        authUser : MOCK_AUTH_USER
      }
    }),

    on(authActions.logout, () => {
      localStorage.removeItem('accessToken');
      return initialState;
    })
)