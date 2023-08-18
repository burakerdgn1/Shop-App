import { Action, createAction, props } from "@ngrx/store";

// export const LOGIN_START = '[Auth] Login Start';//login start
// export const AUTHENTICATE_SUCCESS = '[Auth] Login';//login success
// export const LOGOUT = '[Auth] Logout';
// export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
// export const SIGNUP_START = '[Auth] Signup Start';
// export const CLEAR_ERROR = '[Auth] Clear Error';
// export const AUTO_LOGIN = '[Auth] Auto Login';



// export class AuthenticateSuccess implements Action {
//     readonly type = AUTHENTICATE_SUCCESS;
//     constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date; redirect: boolean; }) { }
// }

export const authenticateSuccess = createAction(
    '[Auth] Login',
    props<{
        email: string; userId: string; token: string; expirationDate: Date; redirect: boolean;
    }>()
);


// export class Logout implements Action {
//     readonly type = LOGOUT;
// }

export const logout = createAction(
    '[Auth] Logout',
);


//export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError | AutoLogin;

// export class LoginStart implements Action {
//     readonly type = LOGIN_START;
//     constructor(public payload: { email: string; password: string; }) { }
// }

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{
        email: string; password: string;
    }>()
)


// export class AuthenticateFail implements Action {
//     readonly type = AUTHENTICATE_FAIL;
//     constructor(public payload: string) { }
// }

export const authhenticateFail = createAction(
    '[Auth] Login Fail',
    props<{
        error: string
    }>()
)


// export class SignupStart implements Action {
//     readonly type = SIGNUP_START;
//     constructor(public payload: { email: string, password: string }) { }
// }

export const signupStart = createAction(
    '[Auth] Signup Start',
    props<{
        email: string, password: string
    }>()
)

// export class ClearError implements Action {
//     readonly type = CLEAR_ERROR;
// }

export const clearError = createAction(
    '[Auth] Clear Error'
)

// export class AutoLogin implements Action {
//     readonly type = AUTO_LOGIN;
// }
export const autoLogin = createAction(
    '[Auth] Auto Login'
)