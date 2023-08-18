import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;




  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').pipe(map(recipesState => recipesState.recipes)).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    // this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // });
    //this.recipes = this.recipeService.getRecipes();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    //we should also inform our router about our current route(activated route)
    this.router.navigate(['new'], { relativeTo: this.route });

  }
}

