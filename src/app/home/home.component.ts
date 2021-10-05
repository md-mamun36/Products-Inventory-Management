import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../myService/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _header:AppServiceService, private router: Router) { }

  ngOnInit() {
    if(this.myName=='' || this.myName==null){
  
      this.router.navigate(['login'])
    }
    else{
      this._header.header.next(true)
    }
    

  }
  myName:string=sessionStorage.getItem("userName")

}
