import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  
  isEmpty(Value:string) {
    
    if ( Value==null || Value ==undefined || Value.toString().trim() =="") 
    {
      return true;
    }
    else 
    {
      return false;
    }
  }
}
