import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  @Input('recipeSelected') public recipeSelected:any;
  public recipe:String="";

  constructor(private router:ActivatedRoute,private recipeService:RecipeService) {
   }

  ngOnInit(): void {
  }

}
