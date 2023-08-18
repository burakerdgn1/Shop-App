import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions';


export interface State {
    recipes: Recipe[]
}
const initialState: State = {
    recipes: []

}

export const recipeReducer = createReducer(
    initialState,
    on(RecipeActions.setRecipes, (state, action) => {
        return {
            ...state,
            recipes: action.recipes
        }
    }),

    on(RecipeActions.addRecipe, (state, action) => {
        return {
            ...state,
            recipes: [...state.recipes, action.recipe]//adds new recipe in the end of the recipes 
        }
    }),

    on(RecipeActions.updateRecipe, (state, action) => {
        const updatedRecipe = { ...state.recipes[action.index], ...action.newRecipe }
        const updatedRecipes = [...state.recipes];
        updatedRecipes[action.index] = updatedRecipe;
        return {
            ...state,
            recipes: updatedRecipes,
        }
    }),

    on(RecipeActions.deleteRecipe, (state, action) => {
        return {
            ...state,
            recipes: state.recipes.filter((recipe, index) => {
                return action.index !== index;
            }),
        }
    })
)






// export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
//     switch (action.type) {
//         case RecipeActions.SET_RECIPES:
//             return {
//                 ...state,
//                 //recipes: [...state.recipes, action.payload]
//                 recipes: [...action.payload]
//             }
//         case RecipeActions.ADD_RECIPE:
//             return {
//                 ...state,
//                 recipes: [...state.recipes, action.payload]
//             }
//         case RecipeActions.UPDATE_RECIPE:
//             const updatedRecipe = {
//                 ...state.recipes[action.payload.index],
//                 ...action.payload.newRecipe
//             };
//             const updatedRecipes = [...state.recipes]
//             updatedRecipes[action.payload.index] = updatedRecipe

//             return {
//                 ...state,
//                 recipes: updatedRecipes
//             }
//         case RecipeActions.DELETE_RECIPE:
//             return {
//                 ...state,
//                 recipes: state.recipes.filter((recipe, index) => {
//                     return index !== action.payload;
//                 })

//             }


//         default: return state;

//     }
// }