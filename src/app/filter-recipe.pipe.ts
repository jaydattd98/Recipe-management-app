import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRecipe'
})
export class FilterRecipePipe implements PipeTransform {

  transform(value: any, nameRecipe: any):any {

     if(value.length===0 || nameRecipe=='' || nameRecipe==undefined){
      return value;
    }
    const resultArray=[];
    for(const item of value ){
      if(item.name.toLowerCase().startsWith(nameRecipe.toLowerCase()))
        resultArray.push(item);
    }
    return resultArray;
  }

}
