import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";
import { take, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {

    }
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    // }

    //our datastorage service fetchrecipes method runs whenever this route gets loaded, to ensure that our data(recipes) is there always
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('recipes').pipe(
            take(1)//to ensure we dont do this multiple times
            ,
            map(recipesState => {
                return recipesState.recipes;

            }),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(RecipeActions.fetchRecipes());
                    //return this.actions$.pipe(ofType(RecipeActions.setRecipes), take(1))
                    return of([]);

                }
                else {
                    return of(recipes); //we dont send any request if we already have recipes

                }
            })
        )

    }

}