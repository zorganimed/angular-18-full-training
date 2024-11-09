import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel, User} from "../model/login.model";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  counterValue = signal<number>(0);
  players = signal([{'id':1, 'name':'sacha'}]);

  constructor(private http : HttpClient) { }

  proceedLogin(_data:LoginModel){
    return this.http.get<User[]>('http://localhost:3000/user?id='+_data.username+'&password='+_data.password);
  }

  isLoggedIn(){
    return localStorage.getItem('username') != null;
  }

  proceedRegister(_data : User){
    return this.http.post('http://localhost:3000/user', _data);
  }
}
