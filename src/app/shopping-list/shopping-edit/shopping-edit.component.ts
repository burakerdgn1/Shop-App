import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';





@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editing = false;
  editedItem: Ingredient;


  constructor(private store: Store<fromApp.AppState>) {


  }


  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editing = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });

        //editing
      }
      else {
        this.editing = false;



      }
    });

    // this.subscription = this.shoppingService.startedEditing.subscribe((index: number) => {
    //   //each time we get a new information, this runs, so we should do the opearations inside the subscribe callback!!!

    //   this.editing = true;
    //   this.editedIndex = index;
    //   this.editedItem = this.shoppingService.getIngredient(index);
    //   // this.slForm.value.name = this.editedItem.name;
    //   // this.slForm.value.amount = this.editedItem.amount;
    //   this.slForm.setValue({
    //     name: this.editedItem.name,
    //     amount: this.editedItem.amount
    //   });
    // });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.StopEdit())

  }

  onClear() {
    this.slForm.reset();
    this.editing = false;
    this.store.dispatch( ShoppingListActions.StopEdit())
  }
  onDelete() {
    //his.shoppingService.deleteIngredient();
    this.store.dispatch(ShoppingListActions.DeleteIngredient());
    this.onClear();


  }



  onSubmit(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editing) {
      // this.shoppingService.editIngredient(this.editedIndex, newIngredient);
      this.store.dispatch(ShoppingListActions.UpdateIngredient({ingredient:newIngredient}));
    }
    else {
      // this.shoppingService.addIngredient(newIngredient);
      this.store.dispatch(ShoppingListActions.AddIngredient({ ingredient: newIngredient }));
    }

    this.editing = false;

    f.reset();
  }





}
