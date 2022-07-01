import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuardService } from 'src/services/can-deactivate-guard.service';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'',component:RecipesComponent},
  {path:'recipe',component:RecipesComponent,children:[
    {path:'',component:RecipeListComponent},
    {path:'add',component:AddRecipeComponent},
    {path:'list',component:RecipeListComponent},
    {path:'details/:id',component:RecipeDetailsComponent},
    {path:':id/edit',component:AddRecipeComponent,canDeactivate:[CanDeactivateGuardService]},
    {path:'**',component:RecipeListComponent},
  ]},
  {path:'shopping-list',component:ShoppingListComponent},
  {path:'**',redirectTo:'/recipe'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
