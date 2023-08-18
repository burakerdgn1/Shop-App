import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private ingredientToSubs: Subscription;

  constructor(private store: Store<fromApp.AppState>) {

  }
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.ingredientToSubs = this.shoppingService.ingredientToAdd.subscribe((ing) => {
    //   this.ingredients = ing;
    // });

  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.StartEdit({index:index}));
    // this.shoppingService.startedEditing.next(index);//we pass our index to the subject, so we can listen to it after

  }


  ngOnDestroy(): void {
    // this.ingredientToSubs.unsubscribe();
  }








}
