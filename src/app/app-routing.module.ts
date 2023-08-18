import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";


const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },

    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then((module) => module.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then((module) => module.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule) },



];



@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule//every module works on its own, thet dont communicate with each other
        //its exported to make router module be available also at app module
    ]
})

export class AppRoutingModule {

}

//to not download or load with delay, the modules, we preload them as code bundles
//so our subsequent navigation request will be faster
//1.fast initial load with lazy loading
//2.fast subsequent loads