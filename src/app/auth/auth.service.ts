import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenExpTimer: any;
    //user = new BehaviorSubject<User>(null);//we can aceess to the currently active user even if we only subscribe after that user has been emmitted
    //to just load the currently active user

    constructor(private store: Store<fromApp.AppState>) { }


    setLogoutTimer(expDuration: number) {
        this.tokenExpTimer = setTimeout(() => {
            this.store.dispatch(AuthActions.logout());
        }, expDuration);
    }

    clearLogoutTimer() {
        clearTimeout(this.tokenExpTimer);
        this.tokenExpTimer = null;
    }





















    // autoLogin() {
    //     console.log("autoLogin");
    //     const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string; } = JSON.parse(localStorage.getItem('userData'));
    //     if (!userData) {
    //         console.log("user data null");

    //         return;
    //     }
    //     const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    //     if (loadedUser.token) {

    //         const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //         //this.user.next(loadedUser);
    //         this.store.dispatch(new AuthActions.AuthenticateSuccess({ email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate) }))
    //         this.autoLogout(expDuration);

    //     }

    // }
    // logout() {
    //     //this.user.next(null); 
    //     this.store.dispatch(new AuthActions.Logout());
    //     //this.router.navigate(['/auth']);
    //     localStorage.removeItem('userData');
    //     if (this.tokenExpTimer) {
    //         clearTimeout(this.tokenExpTimer);
    //     }
    //     this.tokenExpTimer = null;


    // }

    // signup(email: string, password: string) {
    //     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true,

    //     }).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));//tap allows us to perform some action without changing the response

    // }

    // login(email: string, password: string) {
    //     //console.log("normal login");
    //     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true,

    //     }).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
    // }

    // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //     //console.log("right before lclstorage");

    //     const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    //     const user = new User(email, userId, token, expirationDate);
    //     localStorage.setItem('userData', JSON.stringify(user));
    //     //this.user.next(user);
    //     this.store.dispatch(new AuthActions.AuthenticateSuccess({ email: email, userId: userId, token: token, expirationDate: expirationDate }))

    //     this.autoLogout(expiresIn * 1000);

    // }

    // private handleError(errorResponse: HttpErrorResponse) {
    //     let errorMessage = 'An unknown error occured';
    //     if (!errorResponse.error || !errorResponse.error.error) {
    //         throwError(errorMessage);
    //     }
    //     switch (errorResponse.error.error.message) {
    //         case 'EMAIL_NOT_FOUND': errorMessage = 'There is no user record corresponding to this identifier. ';
    //             break;
    //         case 'EMAIL_EXISTS': errorMessage = 'This email exits already';
    //             break;
    //         case 'INVALID_PASSWORD': errorMessage = 'The password is invalid or the user does not have a password';
    //             break;

    //         // case 'OPERATION_NOT_ALLOWED': console.log(errorResponse.message);
    //         // case 'TOO_MANY_ATTEMPTS_TRY_LATER': console.log(errorResponse.message);
    //     }
    //     return throwError(errorMessage);
    // }

}

