import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient) { }
//url="https://pharmacy-65f6f-default-rtdb.firebaseio.com/"
//save mathod
saveusers(users:any[] ){
 return this.http.post('http://localhost:3000/user',users)
}
}
