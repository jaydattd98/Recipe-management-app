import { Component, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-first-project';
  public name="JAYDATT";
  @Input() public recipeLoaded:any;
  public isShowRecipeNav:boolean=true;
  constructor(private recipeService:RecipeService){

  }
  ngOnInit(): void {
  }

  toggleNavRecipe(recipe:any){
    console.log("we and toggling recipe")
    this.isShowRecipeNav=(recipe=="recipe");
    console.log(this.isShowRecipeNav)
  }
}
