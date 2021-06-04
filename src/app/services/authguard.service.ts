import { Injectable } from '@angular/core';
import { DalService } from './dal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(
    public dal:DalService
  ) { }

  canActivate(): boolean {
    return this.dal.isAuthenticated();
  }
}
