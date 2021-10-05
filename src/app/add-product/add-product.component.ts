import { HttpClient } from '@angular/common/http';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../myService/app-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private _header: AppServiceService,private router: Router, private _http: HttpClient) { }

  ngOnInit() {
    if(this.myName=='' || this.myName==null){
  
      this.router.navigate(['login'])
    }
    else{
      this._header.header.next(true)
    }
     this.onsave()
  }

  myName:string=sessionStorage.getItem("userName")
  url = 'http://localhost:3000/'
  @ViewChild('mid') mid: ElementRef;
  @ViewChild('mname') mname: ElementRef;
  @ViewChild('mquentity') mquentity: ElementRef;
  @ViewChild('mprice') mprice: ElementRef;
  @ViewChild('muse') muse: ElementRef;
  editMode: boolean = false;
  editindex:number;

  products: any = {}

  onAdd(mid, mname, mquentity, mprice, muse) {
    if(this.editMode){
      this.products[this.editindex]={
        id: mid.value,
        name: mname.value,
        quentity:parseInt(this.products[this.editindex].quentity) + parseInt((mquentity.value)),
        price: mprice.value,
        use: muse.value
      }

      this.editMode=false;
      this._http.put(this.url + "product", this.products).subscribe((result2) => {
        console.log("result", result2)
      })

      mid.value = '',
        mname.value = '',
        mquentity.value = '',
        mprice.value = '',
        muse.value = ''
    }


    else{
      if ((mid.value && mname.value && mquentity.value && mprice.value && muse.value) == '') {
        alert("Please input Properly")
  
      }
      else {
  
    
        this.products.push({
          id: mid.value,
          name: mname.value,
          quentity: mquentity.value,
          price: mprice.value,
          use: muse.value
        })
        this._http.post(this.url + "product", this.products).subscribe((result2) => {
          console.log("result", result2)
        })
  
        mid.value = '',
          mname.value = '',
          mquentity.value = '',
          mprice.value = '',
          muse.value = ''
      }
    }
 

  }
  onsave() {
    this._http.get(this.url + "product")
      .subscribe((response) => {
        const data = JSON.stringify(response)
        this.products = JSON.parse(data)
      })
  }
 
  onedit(i) {
    this.editindex=i;
    this.editMode = true;
    this.mid.nativeElement.value = this.products[i].id;
    this.mname.nativeElement.value = this.products[i].name;
    this.mquentity.nativeElement.value = 0;
    this.mprice.nativeElement.value = this.products[i].price;
    this.muse.nativeElement.value = this.products[i].use

  }
  ondelete(i) {
    if (confirm('Do you want to delete this Item?')) {
      this.products.splice(i, 1)
      this._http.put(this.url + "product", this.products).subscribe((result2) => {
        console.log("result", result2)
      })
    }

  }

}
