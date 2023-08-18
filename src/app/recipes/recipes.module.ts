import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesResolverService } from './recipes-resolver.service';
@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    //whatever module is used in the moodules should also be declared in the imports(this module), its not enough to declare them only in app.module
    //exceopt the services(they are used from the app.module)
    imports: [

        SharedModule,//for ngIf and ngFor
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
                    { path: '', component: RecipeStartComponent },
                    { path: 'new', component: RecipeEditComponent },
                    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
                    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },

                ]
            },

        ])
    ],
    exports: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],


})
export class RecipesModule {

}