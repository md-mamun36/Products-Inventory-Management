import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../myService/app-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {

  constructor(private _header:AppServiceService, private router: Router,private _http: HttpClient) { }

  ngOnInit() {
    if(this.myName=='' || this.myName==null){
  
      this.router.navigate(['login'])
    }
    else{
      this._header.header.next(true)
    }
    this.onsave();
    this. onsavesells()
    this.isdisable=false
this.editindex=0;
  }
  myName:string=sessionStorage.getItem("userName")
  @ViewChild('mid') mid: ElementRef;
  @ViewChild('mname') mname: ElementRef;
  @ViewChild('mquentity') mquentity: ElementRef;
  @ViewChild('mprice') mprice: ElementRef;
  @ViewChild('muse') muse: ElementRef;
  url = 'http://localhost:3000/'
  products:any=[]
  selproducts:any=[]
  editindex:number=0;
  editvalue:string;
  editMode:boolean=false;
  isdisable:boolean=false;

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
  onchane(i){
    this.editindex=i.value
    this.mid.nativeElement.value=this.products[this.editindex].id;

    //this.mquentity.nativeElement.value=this.products[this.editindex].quentity;
    this.mprice.nativeElement.value=this.products[this.editindex].price;
    //this.muse.nativeElement.value=(this.products[this.editindex].quentity)*(this.products[this.editindex].price)
    //alert(1+(i.value))
    this.editvalue=this.products[this.editindex].name;
  }
a:number;
b:number;
c:number;
d:number;
quenty:number=0;
  ontotal(a,b){
this.a=a.value;
this.b=b.value;
this.muse.nativeElement.value=this.a*this.b
  }
  ontotal2(c,d){
this.c=c.value;
this.d=d.value;
this.muse.nativeElement.value=this.c*this.d
  }

  onAdd(mid,mquentity,mprice,muse){
   if(this.editMode){
    this.quenty=mquentity.value
   //product array update by sell ary
  /* if(this.selproducts[this.editindex].quentity < this.quenty){
    this.products[this.editindex].quentity=this.products[this.editindex]
    .quentity-(this.quenty-this.selproducts[this.editindex].quentity)
    alert(this.products[this.editindex].quentity)
  
    this._http.put(this.url + "product.json", this.products).subscribe((result2) => {
      console.log("result", result2)
    })
  }
  else if(this.selproducts[this.editindex].quentity > this.quenty){
    this.products[this.editindex].quentity=this.products[this.editindex]
    .quentity+(this.selproducts[this.editindex].quentity-this.quenty)
    this._http.put(this.url + "product.json", this.products).subscribe((result2) => {
      console.log("result", result2)
    })
  }

*/
     this.isdisable=false
      this.selproducts[this.editindex]={
        id: mid.value,
       name: this.selproducts[this.editindex].name,
        quentity: + parseInt((mquentity.value)),
        price: mprice.value,
        total: muse.value
       
      }
    
     
      this.editMode=false;
      this._http.put(this.url + "sells", this.selproducts).subscribe((result2) => {
        console.log("result", result2)
      })

      mid.value = '',
      this.mname.nativeElement.value='',
        mquentity.value = '',
        mprice.value = '',
        muse.value = ''
    }
    else{
      if ((mid.value && mquentity.value && mprice.value && muse.value) == '') {
        alert("Please input Properly")
  
      }
      else {
        if(this.products[this.editindex].quentity < mquentity.value){
          alert(mquentity.value+" Units are not available in Stock")
        }
        else{
          this.selproducts.push({
            id: mid.value,
            name:this.editvalue,
            quentity: mquentity.value,
            price: mprice.value,
            total:muse.value
  
  
          })
          this.products[this.editindex].quentity= this.products[this.editindex].quentity-mquentity.value;
        
          this._http.put(this.url + "product", this.products).subscribe((result2) => {
          console.log("result", result2)
        })
          this._http.post(this.url + "sells", this.selproducts).subscribe((result2) => {
          console.log("result", result2)
         })
   
          mid.value = '',
          this.mname.nativeElement.value='',
            mquentity.value = '',
            mprice.value = '',
            muse.value = ''
        }
  
  
      }
      
    }
   
    
  }

    onedit(i) {
      this.isdisable=true
      this.editindex=i;
      this.editMode = true;
      this.mid.nativeElement.value = this.selproducts[i].id;
      //this.editvalue = this.selproducts[i].name;
      this.mquentity.nativeElement.value = this.selproducts[i].quentity;
      this.mprice.nativeElement.value = this.selproducts[i].price;
    
        //this.muse.nativeElement.value = this.selproducts[i].total
      
  
  
    }
    ondelete(i) {
      if (confirm('Do you want to delete this Item?')) {
        this.selproducts.splice(i, 1)
        this._http.put(this.url + "sells", this.selproducts).subscribe((result2) => {
          console.log("result", result2)
        })
      }
  
    }
  }


