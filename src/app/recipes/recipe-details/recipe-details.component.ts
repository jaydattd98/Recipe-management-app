import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDatabaseService } from 'src/services/recipe-database.service';
import { RecipeService } from 'src/services/recipe.service';
import { recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  public recipe:any;
  public id:any;
  deleteMsg:any;
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router,
    private recipeDatabaseService:RecipeDatabaseService) { }

  ngOnInit(): void {
    // this.recipeService.recipeWasSelectedEvent.subscribe(
    //   item=>this.recipe=item
      
    // );
    this.id=this.route.snapshot.params["id"];
    this.loadRecipe();
  }

  loadRecipe() {
    this.recipeDatabaseService.fetchRecipeById(this.id).subscribe(
      recipe=>{
       if(recipe)
        this.recipe=recipe;
      }
    )
  }

  onDeleteRecipe(){

    this.recipeDatabaseService.deleteRecipeById(this.recipe.id).subscribe();
    this.deleteMsg="Recipe deleted succussfully..!!";
    this.recipe=undefined;
  }

  editRecipe(){

    this.router.navigate(
      ['recipe',this.recipe.id,'edit'],
      {queryParams:{
        name:this.recipe.name,
        description:this.recipe.description
      }
    }
      )
  }
}
