import { createReducer, on } from "@ngrx/store";
import { User } from "../user.mode";
import * as AuthActions from "./auth.actions";


export interface State {
    user: User;
    authError: string;
    loading: boolean;


}
const initialState: State = {
    user: null,
    authError: null,
    loading: false

}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.authenticateSuccess, (state, action) => {
        const user = new User(
            action.email,
            action.userId,
            action.token,
            action.expirationDate
        );

        return {
            ...state,
            user: user,
            authError: null,
            loading: false
        }
    }),
    on(AuthActions.logout, (state, action) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.loginStart, (state, action) => {
        return {
            ...state,
            authError: null,
            loading: true
        }
    }),
    on(AuthActions.authhenticateFail, (state, action) => {
        return {
            ...state,
            user: null,
            authError: action.error,
            loading: false
        }
    }),
    on(AuthActions.clearError, (state) => {
        return {
            ...state,
            authError: null,
        };
    })




)

// export function authReducer(state = initialState, action: AuthActions.AuthActions) {
//     //console.log(state);
//     //console.log(action);
//     switch (action.type) {

//         case AuthActions.AUTHENTICATE_SUCCESS:
//             const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate)
//             return {
//                 ...state,
//                 authError: null,
//                 user: user,
//                 loading: false

//             }
//         case AuthActions.LOGOUT:
//             return {
//                 ...state,
//                 user: null
//             }
//         case AuthActions.LOGIN_START:
//         case AuthActions.SIGNUP_START:
//             return {
//                 ...state,
//                 authError: null,
//                 loading: true

//             }
//         case AuthActions.AUTHENTICATE_FAIL:
//             return {
//                 ...state,
//                 user: null,
//                 authError: action.payload,
//                 loading: false

//             }
//         case AuthActions.CLEAR_ERROR:
//             return {
//                 ...state,
//                 authError: null
//             }

//         default:
//             return state;

//     }

// }