import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RecipesActions from '../store/recipe.actions';
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";
import * as RecipeActions from '../store/recipe.actions';
import { Injectable } from "@angular/core";




@Injectable()
export class RecipeEffects {
    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {

    }

    fetchRecipes = createEffect(() => this.actions$.pipe(
        ofType(RecipesActions.fetchRecipes),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://angular-recipe-book-be533-default-rtdb.firebaseio.com/recipes.json')
        }
        ),
        map(
            recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []

                    };
                });
            }
        ),
        map(recipes => {
            return RecipeActions.setRecipes({ recipes: recipes });
        }
        )
    ));

    storeRecipes = createEffect(() => this.actions$.pipe(
        ofType(RecipeActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),//allows us to merge a value from another observable into this observable
        switchMap(([actionData, recipesState]) => {//array destructuring(actionData comes from oftype, state comes from withLatestFrom)
            return this.http.put('https://angular-recipe-book-be533-default-rtdb.firebaseio.com/recipes.json',//data inside database will be overwritten by put method
                recipesState.recipes)
        })



    ), { dispatch: false });
}
