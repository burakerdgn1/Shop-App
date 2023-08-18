//authhentication

import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.mode";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authenticateSuccess({ email: email, userId: userId, token: token, expirationDate: expirationDate, redirect: true });
}
const handleError = (errorRes: any) => {

    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
        return of(AuthActions.authhenticateFail({ error: errorMessage }));
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'Email exists';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not found';//okay
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Invalid password';//okay
            break;
        default:
            errorMessage = "Unknow error, default is executed"
    }
    return of(AuthActions.authhenticateFail({ error: errorMessage }));
    //WE HAVE TO RETURN A NON ERROR OBSERVABLE HERE FOR OUR STREAM TO NOT DIE
    //return of();//is used to return a new observable


}

@Injectable()
export class AuthEffects {
    //we can execute actions after and after an action is dispatched, stream of dispatched actions
    constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private http: HttpClient, private router: Router, private authService: AuthService) { }

    //effects will subscribe the actions for us so we dont call subscribe
    //the result of this entire chain will be treated as an action, so will be dispatched

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.signupStart),
        switchMap((signupAction) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
                email: signupAction.email,
                password: signupAction.password,
                returnSecureToken: true,

            }).pipe(
                tap(resData =>
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                ),

                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }),
                catchError((errorRes) => { return handleError(errorRes); })
            )
        })
    ));




    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginStart),
        switchMap((authData) => {//creates a new observable,taking an obsevables data
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true,

            }).pipe(tap(resData =>
                this.authService.setLogoutTimer(+resData.expiresIn * 1000)
            ),
                map(resData => {
                    return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
                }), catchError((errorRes) => { return handleError(errorRes); }),)
        }),
    ));



    authRedirect = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess), tap((authSuccessAction) => {
            if (authSuccessAction.redirect) {
                this.router.navigate(['/']);
            }
        })

    ), { dispatch: false });





    autoLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.autoLogin),
        map(() => {
            const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string; } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                console.log("user data null");
                return { type: 'DUMMY' }
            }
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if (loadedUser.token) {
                const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expDuration);


                return AuthActions.authenticateSuccess({ email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate), redirect: false });
                //this.autoLogout(expDuration);

            }
            return { type: 'DUMMY' }
        })
    ));

    authLogout = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })


    ), { dispatch: false });






}