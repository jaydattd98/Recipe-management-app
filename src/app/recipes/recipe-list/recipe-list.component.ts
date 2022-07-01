import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterRecipePipe } from 'src/app/filter-recipe.pipe';
import { RecipeDatabaseService } from 'src/services/recipe-database.service';
import { RecipeService } from 'src/services/recipe.service';
import { recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Input('recipe') public recipe:any;
  recipeName:any;
  notMatchInpute=false;
  public recipes:recipe[]=[];
  recipesArray:any;
  searchingRecipe=false;

  constructor(private recipeService:RecipeService,private filter:FilterRecipePipe,
              private recipeDatabaseService:RecipeDatabaseService) { }

  ngOnInit(): void {
    this.getAllRecipes();
    // this.recipes=this.recipeService.getRecipes();
    // this.recipesArray=this.recipes;
  }
  searchRecipe(){
    this.searchingRecipe=true;
    this.notMatchInpute=false;
    this.recipeDatabaseService.fetchAllRecipe().subscribe(
      res=>{
      this.recipes=res
      this.recipesArray=this.filter.transform(this.recipes,this.recipeName);
      if(this.recipesArray==null || this.recipesArray==undefined || this.recipesArray.length<=0){
        this.notMatchInpute=true;
        this.searchingRecipe=false;
      }else
      this.searchingRecipe=false;
      }
    );
   
  }

  getAllRecipes(){
    this.searchingRecipe=true;
    this.recipeDatabaseService.fetchAllRecipe().subscribe(
      res=>{
        this.recipesArray=res;
          this.searchingRecipe=false;
          console.log(res);
      }
    );
  }
}
