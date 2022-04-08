import { Injectable } from '@angular/core';
import { UserStore } from './user-store';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService  {


  userStore: UserStore = new UserStore;
  constructor() { }

  ngOnInit(): void {}

  public setUserStore(userStore : UserStore) {
    this.userStore = userStore;
  }

  public getUserStore() : UserStore {
    return this.userStore;
  }

  
}

