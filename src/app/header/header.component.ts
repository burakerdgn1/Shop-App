import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isAuthenticated = false;
    constructor(private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.userSub = this.store.select('auth').pipe(map(userState => { return userState.user })).subscribe(user => {
            this.isAuthenticated = !!user;
            //console.log(user);
            //console.log(!!user);
            

        });
    }
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }



    collapsed = true;

    onLogout() {
        this.store.dispatch(AuthActions.logout());
        //this.authService.logout();
    }


    onSaveData() {
        this.store.dispatch(RecipeActions.storeRecipes());
        //this.dataStorageService.storeRecipes();

    }
    onFetchData() {
        //this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(RecipeActions.fetchRecipes())

    }
}