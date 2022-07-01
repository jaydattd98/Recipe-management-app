import { asNativeElements, Component, ElementRef, OnInit, Output, ViewChild,EventEmitter, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateGuard } from 'src/services/can-deactivate-guard.service';
import { RecipeDatabaseService } from 'src/services/recipe-database.service';
import { RecipeService } from 'src/services/recipe.service';
import { recipe } from '../recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit ,OnDestroy,CanDeactivateGuard{
  
  @ViewChild('f') recipeForm: NgForm;
  recipeLocations=["Pune","Mumbai","Nagpur"];
  public msg:any;
  public recipeAdded: any;
  name:any;
  recipe:any;
  editRecipeMode=false;
  showImage=false;
  changesSaved=false;
  imageFile:any;

  constructor(private recipeService:RecipeService,private route:ActivatedRoute,
    private recipeDatabaseService:RecipeDatabaseService) { 
    this.recipeForm=new NgForm([],[]);
  }

  canDeactivate():Observable<boolean>|Promise<boolean>|boolean{
    const name=this.recipeForm.value.recipeDetails.name;
    const description=this.recipeForm.value.recipeDetails.description;
    const imagePath=this.recipeForm.value.recipeDetails.imagePath;

    if(!this.editRecipeMode)
      return true;
    if((name!==this.recipe.name || description!==this.recipe.description || imagePath!==this.recipe.imagePath) && !this.changesSaved)
      return confirm("Do you want to discard changes ?");
    else
    return true;  
  };

  ngOnInit(): void {
    
    this.route.params.subscribe(
      params=>{
        const id=params['id'];
        if (id) {
        this.loadRecipe(id);
      }
      }
    );

    this.route.queryParams.subscribe(
      params=>{
        const name=params['name'];
        const description=params['description'];
      }
    )
  }

  loadRecipe(id:any) {

    this.recipeDatabaseService.fetchRecipeById(id).subscribe(
      recipe=>{
       if(recipe){
          this.recipe=recipe;
          console.log(this.recipe);
          setTimeout(
            ()=>{
              this.recipeForm.setValue({
                recipeDetails:{
                  name:this.recipe.name,
                  description:this.recipe.description,
                  imagePath:this.recipe.imagePath
                },
                // recipeLocation:"Pune"
              })
              this.editRecipeMode=true;
            },100
          )
        }
      }
    )
  }

  ngSubmit(){

    this.changesSaved=true
    const name=this.recipeForm.value.recipeDetails.name;
    const description=this.recipeForm.value.recipeDetails.description;
    const imagePath=this.recipeForm.value.recipeDetails.imagePath;
    const newRecipe=new recipe(name,description,imagePath);
    
    if(!this.editRecipeMode)
    this.recipeDatabaseService.onCreateRecipe(newRecipe).subscribe(
      res=>
      this.msg="Recipe Added ...!!"
      ,error=>
      this.msg="unable to add recipe ...!!"
      
    );
    else
    this.recipeDatabaseService.updateRecipeById(this.recipe.id,newRecipe).subscribe(
      res=>
      this.msg="Recipe Updated ...!!"
      ,error=>
      this.msg="unable to update recipe ...!!"
    );
    
    this.recipeAdded=true;
    this.reset();
  }

  //adding value on click button to which form
  addValueToForm(){
    this.showImage=true;
    this.recipeForm.setValue(
      {
        recipeDetails:{
          name:"Idali-Sambhar",
          description:"Indias Best",
          imagePath:"https://www.theloveofspice.com/wp-content/uploads/2019/01/kanda-poha-recipe.jpg"
        },
        // recipeLocation:"Pune"

      }
    )
    //adding value to single form control

    // this.recipeForm.form.patchValue({
    //   recipeDetails:{
    //     name:"Vada-Pav"
    //   }
    // })
  }

  //Reseting form inputes and all
  reset(){
    this.editRecipeMode=false;
    this.showImage=false;
    this.recipeForm.reset();
  }

  ngOnDestroy(){
    // this.recipeButtonValue="Add Recipe";
  }

  onImageChange(event:any){
    console.log(event);
    this.imageFile=event.target.files[0];
  }

  uploadImageFile(){
    const fd=new FormData();
    fd.append("image",this.imageFile,this.imageFile.name);
    this.recipeDatabaseService.uplodeImageFile(fd).subscribe(res=>
      console.log(res)
      );
  }
}
