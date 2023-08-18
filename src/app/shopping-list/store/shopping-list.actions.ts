import { Ingredient } from "../../shared/ingredient.model";
import { createAction, props } from "@ngrx/store";

export const AddIngredient = createAction(
    '[Shopping List] Add Ingredient',
    props<{ ingredient: Ingredient }>()
);
export const AddIngredients = createAction(
    '[Shopping List] Add Ingredients',
    props<{ ingredients: Ingredient[] }>()
);
//update delete

export const UpdateIngredient = createAction(
    '[Shopping List] Update Ingredient',
    props<{  ingredient: Ingredient }>()
);

export const DeleteIngredient = createAction(
    '[Shopping List] Delete Ingredient',
)

export const StartEdit=createAction(
    '[Shopping List] Start Edit',
    props<{index:number}>()
)
export const StopEdit = createAction('[Shopping List] Stop Edit');



// export class AddIngredient implements Action {
//     readonly type = ADD_INGREDIENT;
//     constructor(public payload: Ingredient) { }
// }

// export class AddIngredients implements Action {
//     readonly type = ADD_INGREDIENTS;
//     constructor(public payload: Ingredient[]) { }
// }

// export class UpdateIngredient implements Action {
//     readonly type = UPDATE_INGREDIENT;
//     constructor(public payload: Ingredient) { }
// }
// export class DeleteIngredient implements Action {
//     readonly type = DELETE_INGREDIENT;
// }
// export class StartEdit implements Action {
//     readonly type = START_EDIT;
//     constructor(public payload: number) { }//we start editing by the action, so we dont need index everywhere, we know it from here
// }
// export class StopEdit implements Action {
//     readonly type = STOP_EDIT;
// }




// export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;

// export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
// export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
// export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
// export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
// export const START_EDIT = '[Shopping List] Start Edit';
// export const STOP_EDIT = '[Shopping List] Stop Edit';