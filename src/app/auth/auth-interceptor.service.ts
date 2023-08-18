import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { exhaustMap, map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

    //works for storing and fetching recipes
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //this interceptor adds token to all outgoing requests

        return this.store.select('auth').pipe(take(1),
            map(authState => {//we map the observable
                return authState.user
            }), exhaustMap(
                //we swap the user observable in exhaustMap function
                user => {
                    if (!user) {//if we dont have user, we handle the original request, we dont modify it( because user is null, token is null)
                        return next.handle(req);
                    }
                    const modifiedReq = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    });

                    return next.handle(modifiedReq);
                }));


    }
}