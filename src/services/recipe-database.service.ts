import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RecipeDatabaseService {

  public recipes:any[]=[];

  firebaseUrl="https://recipe-project-11e15-default-rtdb.asia-southeast1.firebasedatabase.app/";
  constructor(private http:HttpClient) { }

    onCreateRecipe(recipe:any){

      return this.http.post(this.firebaseUrl+'recipe.json',recipe);
    }
  
    fetchAllRecipe(){
     return this.http.get<any[]>(this.firebaseUrl+'recipe.json').pipe(
        map(recipe=>{
          const newRecipeArray=[];
          for(const key in recipe){
            if(recipe.hasOwnProperty(key)){
              newRecipeArray.push({...recipe[key],id:key});
            }
          }
          return newRecipeArray;
        })
      )
    };

    deleteRecipeById(id:any){
      return this.http.delete(this.firebaseUrl+'recipe/'+id+'.json');
    };
    
    fetchRecipeById(id:any){
      return this.http.get(this.firebaseUrl+'recipe/'+id+'.json').pipe(
        map(res=>{
          console.log(res);
          return {...res,id:id};
        })
      );
    }

    updateRecipeById(id:any,recipe:any){
      return this.http.patch(this.firebaseUrl+'recipe/'+id+'.json',
      {name:recipe.name,
       description:recipe.description,
       imagePath:recipe.imagePath
      });
    }

    uplodeImageFile(fd:FormData){
      return this.http.post(this.firebaseUrl+"recipe",fd);
    }
}
