import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

import * as ShoppingListActions from './shopping-list.actions';


export interface State {//state for this shopping list part
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}



const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Oranges', 4),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export const shoppingListReducer = createReducer(
    initialState,
    on(ShoppingListActions.AddIngredient, (state, action) => (
        {
            ...state,
            ingredients: [...state.ingredients, action.ingredient]
        })),

    on(ShoppingListActions.AddIngredients, (state, action) => ({
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
    })),

    on(ShoppingListActions.UpdateIngredient, (state, action) => {
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = { ...ingredient, ...action.ingredient };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
        return {
            ...state,
            ingredients: updatedIngredients,
            editedIngredientIndex: -1,
            editedIngredient: null
        }

    }),

    on(ShoppingListActions.DeleteIngredient, (state) => {
        // will only work if ShoppingListActions.DeleteIngredient is an action created via createAction()
        return {
            ...state,
            ingredients: state.ingredients.filter((ig, igIndex) => {
                return igIndex !== state.editedIngredientIndex;
            }),
            editedIngredientIndex: -1,
            editedIngredient: null,
        };
    }),
    on(ShoppingListActions.StartEdit, (state, action) => {
        // will only work if ShoppingListActions.StartEdit is an action created via createAction()
        return {
            ...state,
            editedIngredientIndex: action.index,
            editedIngredient: { ...state.ingredients[action.index] },
        };
    }),
    on(ShoppingListActions.StopEdit, (state) => {
        // will only work if ShoppingListActions.StopEdit is an action created via createAction()
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1,
        };
      })






)


// export function shoppingListReducer(
//     state = initialState,//ngrx automatically passes the current state 
//     action: ShoppingListActions.ShoppingListActions
// ) {

//     switch (action.type) {
//         case ShoppingListActions.ADD_INGREDIENT:
//             //we return a new state
//             return {
//                 ...state, ingredients: [...state.ingredients, action.payload]//its a convention to copy the previous state as ...state, and we overwrite the ingredients by ingredients:[...]
//             };
//         case ShoppingListActions.ADD_INGREDIENTS:
//             return {
//                 ...state,
//                 ingredients: [...state.ingredients, ...action.payload]

//             }
//         case ShoppingListActions.UPDATE_INGREDIENT:
//             const ingredient = state.ingredients[state.editedIngredientIndex];
//             //always edit data immutably, because directly editing and object, updates the old states object!
//             const updatedIngredient = { ...ingredient, ...action.payload };
//             const updatedIngredients = [...state.ingredients];
//             updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
//             return {
//                 ...state,
//                 ingredients: updatedIngredients,
//                 editedIngredientIndex: -1,
//                 editedIngredient: null

//             };
//         case ShoppingListActions.DELETE_INGREDIENT:
//             return {
//                 ...state,
//                 ingredients: state.ingredients.filter((ing, ingIndex) => {
//                     return ingIndex !== state.editedIngredientIndex;//filters the indexed ingredient
//                 }),
//                 editedIngredientIndex: -1,
//                 editedIngredient: null
//             };
//         case ShoppingListActions.START_EDIT:
//             const editedIngredient = state.ingredients[action.payload];
//             return {
//                 ...state,
//                 editedIngredientIndex: action.payload,
//                 editedIngredient: { ...state.ingredients[action.payload] }

//             };
//         case ShoppingListActions.STOP_EDIT:
//             return {
//                 ...state,
//                 editedIngredient: null,
//                 editedIngredientIndex: -1
//             }



//         default:
//             return state;


//     }

// }








