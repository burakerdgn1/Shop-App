import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService, private store: Store<fromApp.AppState>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        //returns a user object(observable)
        //use map inside pipe, to transform user observable into boolean observable
        //use take(1) to make sure we always take the latest user value and then unsubscribe for this guard execution
        return this.store.select('auth').pipe(take(1),
            map(userState => {
                return userState.user;
            }),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }));

    }

}