import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { DataServiceService } from '../myService/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private http:HttpClient) { }
users=[{
  name:'mamun',
  email:'mdmamun@gmail.com',
  password:'mamun2301'
}]
  ngOnInit() {
   this.onsave()
  }
  name:string;
email:string;
password:string;
isSuccess:boolean=false
isregistered:boolean=false;
onregister(name,email,password){
this.name=name.value;
this.email=email.value;
this.password=password.value;
if((this.name && this.email && this.password)!=''){
  for(let i of this.users){
    if(i.email==email.value){
      this.isregistered=true;
      break;
    }
    else{
      this.isregistered=false;
    }
  }
  if(this.isregistered==true){
    alert("sorry this email is already exist!")
  }
  else{
    this.users.push({
      name:this.name,
      email:this.email,
      password:this.password
    })
    this.http.post('http://localhost:3000/user',this.users)
   .subscribe((result)=>{
     console.log("result",result)
   })
    
     alert("registration success!")
    this.isSuccess=true;
   name.value='';
   email.value='';
   password.value='';
  }

}
else{
  alert("plz fill up properly")
}
}

onsave(){
  this.http.get('http://localhost:3000/user')
  .subscribe((response)=>{
  const data=JSON.stringify(response)
  this.users=JSON.parse(data)
  })
}

}
