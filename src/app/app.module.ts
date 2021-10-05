import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParticlesModule } from 'angular-particle';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { CalculateComponent } from './calculate/calculate.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
//import { DataServiceService } from './myService/data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './myPipe/filter.pipe';

const appRoutes:Routes=[
{path:'', redirectTo:'login',pathMatch:'full'},
{path:'login', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:'login', component:LoginComponent},
{path:'app', component:AppComponent},
{path:'home', component:HomeComponent},
{path:'product', component:AddProductComponent},
{path:'sell', component:SellProductComponent},
{path:'calculate', component:CalculateComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddProductComponent,
    SellProductComponent,
    CalculateComponent,
    MenuComponent,
    RegisterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    ParticlesModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
