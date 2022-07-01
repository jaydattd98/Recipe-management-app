import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe:any;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
      if(this.recipe==undefined && this.recipe==null)
      this.recipe=undefined;

  }

  onSelect(){
    this.recipeService.recipeWasSelectedEvent.next(this.recipe);
  }
}
