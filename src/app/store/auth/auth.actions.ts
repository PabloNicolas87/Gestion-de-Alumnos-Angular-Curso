import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginData } from "../../core/models/index-auth";

export const authActions = createActionGroup(
    {
        source: 'Auth',
        events: {
            login:props<{ payload: LoginData }>(),
            logout: emptyProps(),
        }
    }
)