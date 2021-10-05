import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../myService/app-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private _header: AppServiceService, private http: HttpClient) { }

  ngOnInit() {
    this.onsave();
    this._header.header.next(false);

  }

  url = 'http://localhost:3000/user';
  users: any = [];
  email: string;
  password: string;

  onsave() {
    this.http.get('http://localhost:3000/user')
      .subscribe((response) => {
        const data = JSON.stringify(response)
        this.users = JSON.parse(data)
      })
  }

  //login validate system
  logNmae:string='';
islogin:boolean;
  onlogin(email, password) {
    
    this.email = email.value;
    this.password = password.value;
    if ((this.email && this.password) != '') {
      for(let i of this.users){
        if(i.email==email.value && i.password==password.value){
          this.logNmae=i.name;
          this.islogin=true;
          break;
        }
        else{
          this.islogin=false;
        }
      }
    
      if(this.islogin==true)
      {
        alert("Welcome! " + this.logNmae);
        sessionStorage.setItem("userName",this.logNmae);
        this._header.header.next(true);
      this.router.navigate(['/home']);
      
      }
      else{
        alert("this email or password not valid!")
      }
      

    }
    else {
      alert("plz fill up properly")
    }
  }
}
