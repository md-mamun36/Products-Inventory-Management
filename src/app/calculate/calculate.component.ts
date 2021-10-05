import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../myService/app-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {

  constructor(private _header:AppServiceService, private router: Router,private _http: HttpClient) { }

  ngOnInit() {
    
    if(this.myName=='' || this.myName==null){
  
      this.router.navigate(['login'])
    }
    else{
      this._header.header.next(true)
    }
    this.onsave();
    this. onsavesells();
   
   
  }
  myName:string=sessionStorage.getItem("userName")
  products:any=[];
  selproducts:any=[];
  url = 'http://localhost:3000/';

  ser:string=''
  sel:string=''
sumv:any;
sumunit:any;
onsearch(s){
  this.ser=s.value
}
onsearchsels(sels){
this.sel=sels.value
}

  onsave() {
    this._http.get(this.url + "product")
      .subscribe((response) => {
        const data = JSON.stringify(response)
        this.products = JSON.parse(data)
      })
  }
 onsavesells() {
    this._http.get(this.url + "sells")
      .subscribe((response) => {
        const data1 = JSON.stringify(response)
        this.selproducts = JSON.parse(data1)
      })
  }

  ondelete(i) {
    if (confirm('Do you want to delete this Item?')) {
      this.selproducts.splice(i, 1)
      this._http.put(this.url + "sells", this.selproducts).subscribe((result2) => {
        console.log("result", result2)
      })
    }

  }
  ondeletep(i) {
    if (confirm('Do you want to delete this Item?')) {
      this.products.splice(i, 1)
      this._http.put(this.url + "product", this.products).subscribe((result2) => {
        console.log("result", result2)
      })
    }

  }

  gettotal(){
    let totalprice:number=0;
    for(let j of this.selproducts){
     totalprice=totalprice+ parseFloat(j.total);
      
    }
    this.sumv=totalprice
  }
  getunit(){
   let totalunit:number=0;
    for(let p of this.products){
      totalunit=totalunit+ parseFloat(p.quentity);
      
    }
    this.sumunit=totalunit;
  }

}
