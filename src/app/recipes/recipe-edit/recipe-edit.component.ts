import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) {

  }
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();

    });
  }


  onSubmit() {
    //const newRecipe = new Recipe(this.recipeForm.value.name, this.recipeForm.value.description, this.recipeForm.value.imagePath, this.recipeForm.value.ingredients);
    if (this.editMode) {
      this.store.dispatch(RecipeActions.updateRecipe({ index: this.id, newRecipe: this.recipeForm.value }));
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(RecipeActions.addRecipe({ recipe: this.recipeForm.value }));
    }
    //this.router.navigate(['../'], { relativeTo: this.route });
    // console.log('saved');
    this.onCancel();



  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
      })
    );

  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
    console.log('cancel');


  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  private initForm() {
    let recipeName = '';
    let imageUrl = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      //const recipe = this.recipeService.getRecipe(this.id);

      this.storeSub = this.store.select('recipes').pipe(map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        }
        )
      })).subscribe(recipe => {
        imageUrl = recipe.imagePath;
        recipeName = recipe.name;
        description = recipe.description;
        if (recipe['ingredients']) {
          for (let recipeIngredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(recipeIngredient.name, Validators.required),
                'amount': new FormControl(recipeIngredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])

              })
            );
          };
        }
      })


    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
