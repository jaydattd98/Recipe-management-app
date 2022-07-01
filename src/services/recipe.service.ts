import { EventEmitter, Injectable, Output } from '@angular/core';
import { recipe } from 'src/app/recipes/recipe.model';
import { RecipeDatabaseService } from './recipe-database.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  @Output() recipeWasSelectedEvent=new EventEmitter();

  public recipes:recipe[]=[
    new recipe("pohe","best indian dish","https://www.theloveofspice.com/wp-content/uploads/2019/01/kanda-poha-recipe.jpg"),
    new recipe("masala dosa","indian dish","https://www.google.com/url?sa=i&url=https%3A%2F%2Fswarajyamag.com%2Fculture%2Fsimple-food-dosai-dosey-doshai-i-mean-the-dosa&psig=AOvVaw3jEbWJKWHnkTup7A1OdSJ2&ust=1636014879112000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCOjZ2cHk-_MCFQAAAAAdAAAAABAJ"),
  ]
  constructor(private recipeDatabaseService:RecipeDatabaseService) { }

  addRecipe(recipe:any){
    if(recipe!=undefined){
      this.recipes.push(recipe);
      this.recipeDatabaseService.onCreateRecipe(recipe);
    }
  }

  deleteRecipe(recipe:any){
    console.log(this.recipes)
    var i=this.recipes.indexOf(recipe);
    if(i>=0)
    this.recipes.splice(i,1);
    console.log(this.recipes)

  }

  getRecipes(){

    return this.recipes;
  }
}
